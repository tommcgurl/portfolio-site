# Portfolio Visual Overhaul — Design Spec

**Date:** 2026-03-31  
**Status:** Approved  
**Scope:** Full visual system overhaul — `app/page.tsx`, `styles/globals.css`, `app/globals.css`, `tailwind.config.ts`, `components/StackedLogo.tsx`, and SVG assets in `public/`

---

## Problem

The current portfolio site has several visual issues:
- Poor button contrast: `bg-red-400 text-slate-900` fails readability at a glance
- Inconsistent accent colors: rose, teal, blue, and red-400 are used interchangeably with no system
- Generic typography: Arial/Helvetica gives no personality
- Floating particle animation adds visual noise without adding meaning
- Section alternating backgrounds (`slate-800/slate-900`) are low-contrast and muddled
- Logo SVG stroke color (`#C56969`) clashes with the surrounding palette
- Footer year is stale (2025)

---

## Goals

- Replace the entire visual system with a cohesive warm/expressive dark theme
- Fix all contrast and consistency issues
- Keep the existing page structure and animated logo unchanged
- Zero new dependencies (all changes are CSS, Tailwind, and existing Lucide icons)

---

## Color System

All colors are defined as CSS custom properties in `globals.css` and mapped in `tailwind.config.ts`.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0e0e16` | Page background |
| `--color-surface` | `#18181f` | Card backgrounds |
| `--color-border` | `#252530` | Default borders |
| `--color-border-strong` | `#2d2d3a` | Button/outline borders |
| `--color-text-1` | `#f1f5f9` | Primary text |
| `--color-text-2` | `#94a3b8` | Secondary/body text |
| `--color-text-3` | `#475569` | Muted/caption text |
| `--color-accent` | `#f97316` | Primary accent (orange) |
| `--color-accent-2` | `#ec4899` | Secondary accent (pink) |

**Gradient:** `linear-gradient(135deg, #f97316, #ec4899)` — used only on the primary CTA button and hero background radial glows.

---

## Typography

**Font:** Plus Jakarta Sans (Google Fonts, loaded via `next/font/google`)  
**Replaces:** Arial / Helvetica system font

| Role | Size | Weight |
|---|---|---|
| Hero heading | `clamp(48px, 8vw, 80px)` | 800 |
| Section title | `clamp(32px, 5vw, 48px)` | 800 |
| Card/project title | 20px | 700 |
| Section label (uppercase) | 11px | 700 |
| Body text | 16px | 400 |
| Small/caption | 13px | 400–600 |

Letter-spacing: `-0.03em` on hero, `-0.025em` on section titles.

---

## Component Specifications

### Primary Button
- Background: gradient (`#f97316` → `#ec4899`)
- Text: white (`#fff`)
- Padding: `13px 28px`
- Font size: 14px, weight 700
- Border radius: 6px
- No border

### Secondary Button
- Background: transparent
- Border: `1.5px solid #2d2d3a`
- Text: `#94a3b8`
- Same padding/radius as primary

### Outline Accent Button (used in project cards)
- Background: transparent
- Border: `1.5px solid rgba(249,115,22,0.5)`
- Text: `#f97316`
- Border radius: 6px

### Skill Badges
- Background: `rgba(249,115,22,0.08)`
- Border: `1px solid rgba(249,115,22,0.25)`
- Text: `#fb923c`
- Padding: `7px 16px`
- Border radius: 4px

### Cards (About section)
- Background: `#18181f`
- Border: `1px solid #252530`
- Border radius: 12px
- Padding: 24px
- Icon container: 44×44px, `rgba(249,115,22,0.1)` background, 10px radius, orange Lucide icon
- **Hover:** border → `#f97316`, box-shadow → `0 0 24px rgba(249,115,22,0.12)`

### Project Cards (Featured Work section)
- Background: `#18181f`
- Border: `1px solid #252530`
- Border radius: 12px
- Padding: 32px
- Icon container: 52×52px, same orange tint
- **Hover:** border → `#f97316`, box-shadow → `0 0 32px rgba(249,115,22,0.10)`
- Video card icon: Lucide `Youtube` (already imported), stroke `#f97316`
- GitHub card icon: Lucide `Github` (already imported), stroke `#f97316`

### Contact Cards
- Same surface/border/radius as cards
- Padding: `28px 40px`
- Icon: 28px Lucide icon, stroke `#f97316`
- **Hover:** same orange border + glow

---

## Section Layout

### Hero
- Background: `#0e0e16` with two radial gradient overlays:
  - `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.12), transparent 70%)`
  - `radial-gradient(ellipse 40% 40% at 80% 80%, rgba(236,72,153,0.08), transparent 60%)`
- **Remove** the 20-particle floating animation entirely
- Section label pattern not used in hero; role text (`Director of Engineering at electric.ai`) styled in `#f97316`

### All Other Sections
- Each section has a small all-caps orange label above the main heading (e.g. `ABOUT ME`, `TECHNICAL EXPERTISE`)
- Alternating section backgrounds: plain `#0e0e16` and `rgba(255,255,255,0.015)` with `1px solid #252530` top/bottom borders
- Section titles use the new heading style; body copy uses `#94a3b8`

---

## Logo (`StackedLogo.tsx` + SVG assets)

**Animation:** Unchanged. The T and M spread apart on hover/scroll; the O shrinks and centers. All Framer Motion logic is preserved.

**Color change only:**
- SVG files (`T.svg`, `M.svg`, `O.svg`): update stroke from `#C56969` → `white`
- `StackedLogo.tsx`: add `filter: drop-shadow(0 0 8px rgba(249,115,22,0.55))` to both the animated and non-animated container elements

---

## Other Changes

- **Footer year:** Update from 2025 → 2026
- **`app/globals.css` / `styles/globals.css`:** Add new CSS custom properties for the color tokens; replace the `body` font-family rule (font will be applied via `next/font` class on `<body>` in `layout.tsx`)
- **`tailwind.config.ts`:** Extend theme with new color tokens so they're usable as Tailwind classes throughout the page
- **`app/layout.tsx`:** Load Plus Jakarta Sans via `next/font/google` and apply the font class to `<html>` or `<body>`
- **Remove:** All hardcoded `text-rose-*`, `text-teal-*`, `bg-red-400`, `border-rose-*`, `border-teal-*`, `bg-rose-*` classes from `page.tsx`

---

## Out of Scope

- Sticky navigation bar (separate feature)
- New page sections or content changes
- Any changes to the page's scroll behavior or animation timing

---

## Files Changed

| File | Change |
|---|---|
| `app/layout.tsx` | Add Plus Jakarta Sans via next/font |
| `app/globals.css` | Add CSS color tokens, remove old font-family |
| `styles/globals.css` | Same as above (duplicate file — sync both) |
| `tailwind.config.ts` | Extend theme with new color tokens |
| `app/page.tsx` | Replace all Tailwind color classes, remove particle animation, update section labels, fix footer year |
| `components/StackedLogo.tsx` | Add drop-shadow filter to container |
| `public/T.svg` | Stroke: `#C56969` → `white` |
| `public/M.svg` | Stroke: `#C56969` → `white` |
| `public/O.svg` | Stroke: `#C56969` → `white` |
