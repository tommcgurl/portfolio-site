# Particle Background — Design Spec

**Date:** 2026-03-31
**Status:** Approved

---

## Overview

Restore the animated particle background to the hero section of the portfolio, updated to match the current brand color system. The original particle effect used circular `rose-400` dots that behaved like floating embers. The new design uses square pixels in the brand's orange and pink accent colors, rising straight upward.

---

## Visual Design

### Particle Appearance
- **Shape:** Square pixels (sharp-edged rectangles, not circles)
- **Size:** 2–3px per particle (CSS pixels), varied randomly at spawn time
- **Colors:** ~2/3 orange (`#f97316` / `--color-accent`) and ~1/3 pink (`#ec4899` / `--color-accent-2`), picked randomly per spawn — not fixed counts
- **Count:** 30 particles active at any time

### Animation Behavior
- **Direction:** Straight upward — zero horizontal drift
- **Speed:** Random per particle, range 0.4–0.9 CSS px per frame at 60fps. Speed is frame-count-based (not time-based); motion will vary slightly at 120Hz displays — this is acceptable for a decorative effect
- **Opacity lifecycle:** Each particle linearly fades in (0 → 0.6) as it rises, then linearly fades back out (0.6 → 0). The fade-in and fade-out rates are independent (fade-in slightly faster than fade-out). The **primary reset trigger** is opacity reaching 0 after the fade-out phase; an `y < 0` guard is a safety fallback only
- **Reset:** On reset, a particle spawns at the bottom (`y = height + a few px`) at a new random X position, with freshly randomized size, speed, and color
- **Stagger:** On initialization, particles are placed at random Y values within `[0, height]` so the screen populates immediately rather than rising from the bottom in a wave

### Placement & Layering

The hero section uses three layers, bottom to top:

| Layer | Element | z-index |
|-------|---------|---------|
| 1 (bottom) | Canvas particle background | `absolute inset-0`, z-index 0 |
| 2 | Radial gradient overlay (existing) | `absolute inset-0`, z-index 1 |
| 3 (top) | Hero content (logo, text, buttons) | `relative`, z-index 10 (matches existing `z-10`) |

`overflow: hidden` on the hero section clips particles at the boundary. `pointer-events: none` on the canvas ensures no interaction interference.

---

## Architecture

### New Component: `ParticleBackground`

All particle logic lives in `components/ParticleBackground.tsx`. This keeps `page.tsx` clean and makes the effect independently reusable.

**Interface:**
```tsx
interface ParticleBackgroundProps {
  count?: number;   // default: 30
  className?: string;
}
```

**Internals:**
- `useRef<HTMLCanvasElement>` to hold the canvas
- Canvas is absolutely positioned (`absolute inset-0 w-full h-full`) **inside the component** — consumers do not need to pass sizing classes
- Canvas backing store is scaled by `window.devicePixelRatio` for sharp rendering on retina displays. The canvas `width`/`height` attributes are set to `cssWidth * dpr` / `cssHeight * dpr`, and `ctx.scale(dpr, dpr)` is called so all drawing uses CSS pixel coordinates
- A `ResizeObserver` watches the canvas element and re-syncs `width`/`height` + re-scales on resize, then re-scatters particle positions proportionally
- Animation loop uses `useEffect` with a `requestAnimationFrame` loop; the effect returns a cleanup that cancels the pending frame and disconnects the `ResizeObserver`
- All particle state is a plain mutable array inside the `useEffect` closure — no React state, no re-renders during animation

**Why canvas over framer-motion divs:**
The original used 20 framer-motion `<div>` elements. Canvas avoids 30 DOM nodes, produces no layout/style recalculations per frame, and handles resize more cleanly.

### Integration in `page.tsx`

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Layer 1 — particles (z-0) */}
  <ParticleBackground />

  {/* Layer 2 — gradient overlay (z-1) */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 1, background: "radial-gradient(...)" }}
  />

  {/* Layer 3 — hero content (z-10, existing) */}
  <div className="container mx-auto px-6 relative z-10">
    ...
  </div>
</section>
```

---

## Color Values

| Role       | Value     | CSS Token          |
|------------|-----------|--------------------|
| Orange (~⅔) | `#f97316` | `--color-accent`   |
| Pink (~⅓)  | `#ec4899` | `--color-accent-2` |

Opacity is capped at 0.6 so particles feel atmospheric without competing with hero text.

---

## Scope

- **In scope:** Hero section only (`app/page.tsx`), new `components/ParticleBackground.tsx`
- **Out of scope:** Other sections, particle interaction (hover/click), `prefers-reduced-motion` support, mobile-only disabling

---

## Files Affected

| File | Change |
|------|--------|
| `components/ParticleBackground.tsx` | New file |
| `app/page.tsx` | Import and render `<ParticleBackground />` as bottom layer inside hero section |
