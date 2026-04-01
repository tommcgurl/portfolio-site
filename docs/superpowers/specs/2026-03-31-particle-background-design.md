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
- **Size:** 2–3px per particle, varied randomly at spawn time
- **Colors:** ~2/3 orange (`#f97316` / `--color-accent`) and ~1/3 pink (`#ec4899` / `--color-accent-2`)
- **Count:** 30 particles active at any time

### Animation Behavior
- **Direction:** Straight upward — zero horizontal drift
- **Speed:** Random per particle, range 0.4–0.9px per frame (~24–54px/s at 60fps)
- **Opacity:** Each particle fades in as it rises (0 → ~0.6), then fades back out before it exits the top. Particles reset to the bottom at a new random X position when opacity reaches 0 or Y < 0.
- **Stagger:** Particles initialize at random Y positions so the screen populates immediately on load rather than rising from the bottom all at once.

### Placement
- Covers the full hero section (`min-h-screen`)
- Positioned absolutely, behind all hero content (`z-index: 1` for canvas, `z-index: 2` for content)
- `pointer-events: none` — no interaction interference
- `overflow: hidden` on the hero section clips particles at the boundary

---

## Architecture

### New Component: `ParticleBackground`

Extract all particle logic into `components/ParticleBackground.tsx`. This keeps `page.tsx` clean and makes the effect independently testable and reusable.

**Interface:**
```tsx
interface ParticleBackgroundProps {
  count?: number;        // default: 30
  className?: string;
}
```

**Internals:**
- Uses a `useRef<HTMLCanvasElement>` to hold the canvas
- Uses a `useEffect` to start the animation loop on mount and clean it up on unmount (cancel `requestAnimationFrame`)
- Canvas is sized to the container via `ResizeObserver` — updates on window resize so it fills the hero section correctly on all viewports
- All particle state lives in a plain mutable array inside the `useEffect` closure — no React state, no re-renders during animation

**Why canvas over framer-motion divs:**
The original implementation used 20 framer-motion `<div>` elements. Canvas is more appropriate here: it avoids creating 30 DOM nodes, produces no layout/style recalculations during animation, and handles resize more cleanly.

### Integration in `page.tsx`

Add `<ParticleBackground />` as a child of the hero section's wrapper, positioned absolutely behind the content:

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <ParticleBackground />
  {/* existing gradient overlay */}
  {/* existing hero content */}
</section>
```

---

## Color Values

| Role        | Value      | Token                  |
|-------------|------------|------------------------|
| Orange (~⅔) | `#f97316`  | `--color-accent`       |
| Pink (~⅓)   | `#ec4899`  | `--color-accent-2`     |

Particle opacity is capped at ~0.6 so the pixels feel atmospheric without competing with the hero text.

---

## Scope

- **In scope:** Hero section only (`app/page.tsx`), new `components/ParticleBackground.tsx`
- **Out of scope:** Other sections, particle interaction (hover/click), mobile-specific disabling

---

## Files Affected

| File | Change |
|------|--------|
| `components/ParticleBackground.tsx` | New file |
| `app/page.tsx` | Import and render `<ParticleBackground />` inside hero section |
