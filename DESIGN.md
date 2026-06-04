---
version: alpha
name: EuroFuel
description: A data-first, map-centric design system for tracking fuel prices across the European Union. Balances approachable warmth (Manrope, ochre/marine backgrounds) with the precision of a financial dashboard (JetBrains Mono for all numerics, restrained chrome, generous negative space).

colors:
  # ─── Brand (theme-invariant) ─────────────────────────────────
  primary: "#1e40af"
  primary-strong: "#1e3a8a"
  accent-bright: "#60A5FA"
  on-primary: "#FFFFFF"

  # ─── Light theme ─────────────────────────────────────────────
  light-surface: "#FAF9F2"
  light-surface-raised: "#FFFFFF"
  light-surface-elevated: "#FFFFFF"
  light-on-surface: "#0F172A"
  light-on-surface-muted: "#475569"
  light-on-surface-subtle: "#94A3B8"
  light-border: "#0F172A14"
  light-border-strong: "#0F172A24"
  light-primary-faded: "#1e40af14"
  light-primary-glow: "#1e40af33"
  light-map-fill: "#E5E2D2"
  light-map-stroke: "#FAF9F2"
  light-dot-pattern: "#0F172A0F"

  # ─── Dark theme ──────────────────────────────────────────────
  dark-surface: "#0A1A2B"
  dark-surface-raised: "#0F2238"
  dark-surface-elevated: "#152C46"
  dark-on-surface: "#F1F5F9"
  dark-on-surface-muted: "#94A3B8"
  dark-on-surface-subtle: "#64748B"
  dark-border: "#FFFFFF12"
  dark-border-strong: "#FFFFFF24"
  dark-primary-faded: "#60A5FA1A"
  dark-primary-glow: "#60A5FA47"
  dark-map-fill: "#1A2D47"
  dark-map-stroke: "#0A1A2B"
  dark-dot-pattern: "#FFFFFF0A"

typography:
  # ─── Brand ───────────────────────────────────────────────────
  brand-wordmark:
    fontFamily: Manrope
    fontSize: 17px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.02em
  brand-tagline:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.06em

  # ─── Headlines & labels ──────────────────────────────────────
  headline-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  eyebrow:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.10em
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
  caption:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1

  # ─── Numerics (JetBrains Mono, tabular figures) ──────────────
  numeric-display:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.01em
    fontFeature: '"tnum" 1'
  numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.01em
    fontFeature: '"tnum" 1'
  numeric-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.04em
    fontFeature: '"tnum" 1'
  numeric-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.06em
    fontFeature: '"tnum" 1'

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  full: 999px

spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px

components:
  # ─── Navbar ──────────────────────────────────────────────────
  navbar:
    backgroundColor: "{colors.light-surface-raised}"
    height: 64px
    padding: 24px
  navbar-dark:
    backgroundColor: "{colors.dark-surface-raised}"

  # ─── Brand mark (logo square) ────────────────────────────────
  brand-mark:
    backgroundColor: "{colors.primary}"
    size: 32px
    rounded: "{rounded.md}"

  # ─── Nav link ────────────────────────────────────────────────
  nav-link:
    textColor: "{colors.light-on-surface-muted}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  nav-link-hover:
    backgroundColor: "{colors.light-primary-faded}"
  nav-link-active:
    textColor: "{colors.light-on-surface}"
  nav-link-dark:
    textColor: "{colors.dark-on-surface-muted}"
  nav-link-dark-hover:
    backgroundColor: "{colors.dark-primary-faded}"
  nav-link-dark-active:
    textColor: "{colors.dark-on-surface}"

  # ─── Language selector ───────────────────────────────────────
  lang-selector:
    backgroundColor: transparent
    textColor: "{colors.light-on-surface}"
    typography: "{typography.numeric-sm}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  lang-selector-dark:
    textColor: "{colors.dark-on-surface}"

  # ─── Theme toggle ────────────────────────────────────────────
  theme-toggle:
    backgroundColor: transparent
    textColor: "{colors.light-on-surface}"
    rounded: "{rounded.md}"
    size: 38px
  theme-toggle-dark:
    textColor: "{colors.dark-on-surface}"

  # ─── Dropdown menu ───────────────────────────────────────────
  dropdown:
    backgroundColor: "{colors.light-surface-elevated}"
    rounded: "{rounded.lg}"
    padding: 6px
  dropdown-dark:
    backgroundColor: "{colors.dark-surface-elevated}"
  dropdown-item:
    backgroundColor: transparent
    textColor: "{colors.light-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 8px 10px
  dropdown-item-selected:
    backgroundColor: "{colors.light-primary-faded}"
  dropdown-item-dark:
    textColor: "{colors.dark-on-surface}"
  dropdown-item-dark-selected:
    backgroundColor: "{colors.dark-primary-faded}"

  # ─── Floating card (EU averages) ─────────────────────────────
  card-floating:
    backgroundColor: "{colors.light-surface-raised}"
    rounded: "{rounded.xl}"
    padding: 14px 18px
  card-floating-dark:
    backgroundColor: "{colors.dark-surface-raised}"

  # ─── Hint pill ───────────────────────────────────────────────
  pill-hint:
    backgroundColor: "{colors.light-surface-raised}"
    textColor: "{colors.light-on-surface-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  pill-hint-dark:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-on-surface-muted}"

  # ─── Tooltip ─────────────────────────────────────────────────
  tooltip:
    backgroundColor: "{colors.light-surface-elevated}"
    rounded: "{rounded.xl}"
    padding: 14px
    width: 240px
  tooltip-dark:
    backgroundColor: "{colors.dark-surface-elevated}"

  # ─── Map country path ────────────────────────────────────────
  map-country:
    backgroundColor: "{colors.light-map-fill}"
  map-country-hover:
    backgroundColor: "{colors.primary}"
  map-country-dark:
    backgroundColor: "{colors.dark-map-fill}"
  map-country-dark-hover:
    backgroundColor: "{colors.accent-bright}"
---

# EuroFuel — Design System

## Overview

EuroFuel is a **data-first, map-centric** web application for tracking fuel prices across the 27 EU member states. The map is the product; everything else is in service of it.

**Personality.** Two pulls in productive tension:

- *Approachable* — Manrope as the UI font, warm off-white background in light mode, dark marine (never black) in dark mode, soft surfaces and generous spacing.
- *Precise* — JetBrains Mono for every numeral with tabular figures, restrained chrome, thin borders, no decorative flourishes.

The result reads as a **modern data product**: closer to a financial dashboard than a marketing site, but warmer than a typical enterprise tool.

**Audience.** EU drivers and fleet operators comparing prices across borders; data enthusiasts; journalists. Desktop-first.

**Tech assumptions.** React + Material UI (MUI v5+) via `ThemeProvider`. Mapbox GL JS for the map at production scale. `lucide-react` for icons. Manrope and JetBrains Mono loaded from Google Fonts via `<link>` tags.

**Theme model.** The app ships with both a light and a dark theme. Dark is the default for first-time users. The brand color `primary` (`#1e40af`) is sacred and appears identically in both themes — but a *brighter sibling* (`accent-bright`, `#60A5FA`) takes over for **interactive highlights in dark mode only**, where the brand primary lacks contrast against the marine background. See "Colors" below for the rule that governs when to swap.

**Accessibility commitments.** WCAG AA for body text in both themes. `prefers-reduced-motion` must collapse all keyframe animations to instant transitions. The hover-only country tooltip is a known keyboard-accessibility gap and must be paired with a list view or focus-triggered reveal before shipping.

## Colors

The palette is split into three groups: a single **brand** color reused across both themes, and two parallel sets of **surface / text / border** tokens — one per theme.

- **Primary — Slate Blue (`#1e40af`).** The brand. Used for the logo gradient, the "Euro" wordmark in light mode, the country hover fill in light mode, dropdown selection highlights, and the active-nav underline in light mode. It does not change between themes.
- **Primary Strong — Deep Slate (`#1e3a8a`).** The bottom stop of the logo mark's gradient and nowhere else.
- **Accent Bright — Sky Blue (`#60A5FA`).** Dark-mode-only sibling of `primary`. Replaces `primary` for *interactive highlights* in dark mode: country hover fill, active-nav underline, the "Fuel" half of the wordmark, status pip dots, dropdown checkmark. It is never used in light mode.
- **Light Surface family — Warm Ochre Off-White.** `light-surface` (`#FAF9F2`) is the page background — barely distinguishable from white but enough to feel warm. `light-surface-raised` (`#FFFFFF`) is the navbar and floating cards. On-surface text descends through `#0F172A` → `#475569` → `#94A3B8` as the role gets less primary.
- **Dark Surface family — Dark Marine.** `dark-surface` (`#0A1A2B`) is the page background. It's deliberately *blue*, not black or grey — the marine identity is core to the dark theme. `dark-surface-raised` (`#0F2238`) is the navbar, `dark-surface-elevated` (`#152C46`) is reserved for the tooltip and dropdowns to read as floating one tier above. On-surface text descends through `#F1F5F9` → `#94A3B8` → `#64748B`.
- **Map fills.** `light-map-fill` (`#E5E2D2`) is a warm grey that harmonizes with the ochre page background. `dark-map-fill` (`#1A2D47`) sits between the page bg and the navbar tonally. Country strokes match the page background in each theme so they read as thin "channels" cut between countries rather than added lines.

### The `primary` vs `accent-bright` rule

This is the most important rule in the system.

- Use `primary` for elements whose job is to **represent EuroFuel itself**: the logo mark, the brand wordmark in light mode, anything fixed.
- Use the **theme-resolved accent** for elements that **light up to confirm interaction**: hovered countries, active-nav underline, dropdown selection, status indicators. In light mode the theme-resolved accent equals `primary`; in dark mode it equals `accent-bright`.

If the user can interact with it and it lights up to confirm the interaction → accent. If it's a fixed brand element → primary.

## Typography

Two type families do all the work.

- **Manrope** — friendly, modern geometric sans-serif. Handles every word, label, and heading. Weights loaded: 300, 400, 500, 600, 700, 800. Manrope's neutral defaults are tightened with negative letter-spacing (`-0.01em` to `-0.02em`) on headlines so display sizes read as "this matters" rather than soft.
- **JetBrains Mono** — for every numeral. Prices, ISO country codes, language codes — all rendered in Mono with `font-variant-numeric: tabular-nums` (set via `fontFeature: '"tnum" 1'`) so digits align across rows. Numerals are never set in Manrope.

**Eyebrows and category labels** ("EU AVERAGE", "EU PRICE TRACKER") are always uppercase with letter-spacing ≥ `0.06em`. They use Manrope, weight 500–700, sized 10–11px.

**Where each level is used:**

- `brand-wordmark` — the "EuroFuel" logo text.
- `brand-tagline` — the small "EU PRICE TRACKER" caption under the logo.
- `headline-sm` — tooltip country name.
- `eyebrow` — the "EU AVERAGE" label above the floating averages card.
- `body-md` — nav link labels.
- `body-sm` — tooltip row labels ("Diesel", "Gasoline 95"), hint pill copy, tooltip footer.
- `label-md` — dropdown item labels (language names).
- `label-sm` — small card metric labels.
- `caption` — the "Loading EU borders…" message.
- `numeric-display` — EU average prices in the floating card.
- `numeric-md` — tooltip price values.
- `numeric-sm` — language code in the selector pill (e.g. "EN").
- `numeric-xs` — ISO country code in the tooltip (e.g. "AT").

## Layout

The app is a **fixed-viewport single page** that does not scroll: `height: 100vh; overflow: hidden`. The navbar is `flex-shrink: 0` at 64px; the map area fills the rest with `flex: 1; position: relative; overflow: hidden`.

```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR  (64px)                                          │
├──────────────────────────────────────────────────────────┤
│  ┌───────────────┐                                       │
│  │ EU avg card   │           MAP                         │
│  └───────────────┘                                       │
│                                                          │
│                                            ┌────────────┐│
│                                            │ Hint pill  ││
│                                            └────────────┘│
└──────────────────────────────────────────────────────────┘
```

**Spacing model.** Strict **4px base unit**. Values must be multiples of 4 (with a 2px half-step permitted only for hairline borders/offsets). The scale runs `xs (4) → sm (8) → md (12) → lg (16) → xl (24) → xxl (32)`. Card internal padding is `lg` to `xl`; section padding is `xl`. The map area uses `xl` (24px) inset from edges for its floating elements.

**Navbar order, left-to-right.** Brand mark + wordmark + tagline → 32px gap → nav items (Map, Statistics, Compare, About) → flex spacer → language selector → 8px → theme toggle. Right padding: 24px.

**Floating elements over the map.** All positioned absolutely within the map area.

- EU averages card: `top: 24px; left: 24px` — always visible.
- Hint pill: `bottom: 24px; right: 24px` — always visible.
- Tooltip: follows cursor at `translate(16px, -50%)` offset from pointer; `z-index: 30`; `pointer-events: none`.

**Responsive (forward-looking, advisory until a separate mobile pass).** Below 1024px, nav items collapse into a hamburger. Below 768px, the EU averages card becomes a bottom sheet, the hint pill hides, and the tooltip becomes a fixed bottom panel triggered by tap. Below 480px, the brand tagline hides.

## Elevation & Depth

Depth is conveyed through **tonal layers** (lighter surfaces sit higher) with shadows used as a complement, never the sole signal. Every floating element pairs a shadow with a 1px border for definition that survives flat-color backgrounds and reduced-transparency settings.

**Layer stack, bottom to top:**

1. Page background (`light-surface` / `dark-surface`) with a faint dot grid pattern (1px dots, 24px spacing, color from `light-dot-pattern` / `dark-dot-pattern`).
2. Dark mode only: an atmospheric radial gradient (`radial-gradient(ellipse 60% 50% at 50% 45%, dark-primary-faded 0%, transparent 60%)`) layered above the dot grid.
3. The SVG map.
4. Navbar (`*-surface-raised`).
5. Floating cards & hint pill (`*-surface-raised` + small shadow).
6. Tooltip & dropdown menus (`*-surface-elevated` + large shadow + stronger border).

**Shadow tokens:**

- `shadow-sm` — *Light:* `0 1px 3px rgba(15, 23, 42, 0.08)`. *Dark:* `0 1px 3px rgba(0, 0, 0, 0.4)`. Used on the EU averages card and hint pill.
- `shadow-lg` — *Light:* `0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.08)`. *Dark:* `0 1px 2px rgba(0, 0, 0, 0.4), 0 16px 40px rgba(0, 0, 0, 0.5)`. Used on tooltip and dropdown.
- `glow-hover` — `drop-shadow(0 4px 14px {primary-glow})`. Applied as a CSS filter on hovered country paths. Color resolves to `light-primary-glow` / `dark-primary-glow`.

**Motion contributes to perceived depth** through restrained animation. Transitions are 120–280ms with `ease` curves. Springs, bounces, and durations above 320ms are forbidden. Three named keyframes are permitted:

- `ef-fadein` (160ms) — dropdown menus on open.
- `ef-pop` (140ms) — tooltip on appear; preserves a positioning `translate` via CSS variables.
- `ef-shimmer` (1.6s linear infinite) — skeleton loaders.

The theme swap itself transitions `background-color` and `color` on the root container over 280ms; descendants inherit.

## Shapes

The shape language is **softly geometric**. All containers use rounded rectangles; nothing is sharp-cornered. The radius scale climbs by 2px steps to keep nested elements visually related: a `rounded.sm` (6px) dropdown item sits inside a `rounded.lg` (10px) dropdown menu; an icon button at `rounded.md` (8px) sits in a navbar with no radius. The largest container radius is `rounded.xl` (12px) — reserved for floating cards and the tooltip. Full pills (`rounded.full`, 999px) are reserved for the hint pill and the small accent dots; circles are not used as containers for content.

**Status pip dots** are 6px circles in the theme-resolved accent color, optionally ringed with a 3px halo of `*-primary-faded` for emphasis (used on the EU averages eyebrow).

**Icon strokes.** All `lucide-react` icons render at `strokeWidth: 2`, except the brand mark's fuel icon (`strokeWidth: 2.4`) and the tooltip clock (`strokeWidth: 2.2`) which need slightly heavier strokes to read at small sizes.

## Components

### Brand mark

A 32×32 square with `rounded: md` (8px), filled with a 135° linear gradient from `primary` to `primary-strong`, containing a centered `Fuel` icon (`lucide-react`, size 17, stroke 2.4, color `on-primary`). Carries a soft `0 4px 12px {primary-glow}` shadow.

The accompanying wordmark stacks two lines: **"EuroFuel"** with `Euro` in `*-on-surface` and `Fuel` in the theme-resolved accent (`primary` in light mode, `accent-bright` in dark); above the tagline **"EU PRICE TRACKER"** in `*-on-surface-subtle`. 10px gap between mark and wordmark.

### Nav link

Flex row: `[16px icon]  Label`. Padding `8px 14px`, `rounded: md`. Resting color = `*-on-surface-muted`, transparent background. Hover adds `*-primary-faded` background. The active state both promotes color to `*-on-surface` *and* draws a 2px underline in the theme-resolved accent, positioned `bottom: -1px` so it overlaps the navbar's bottom border.

### Language selector

Pill button: `[flag emoji] [code] [chevron]`. Padding `8px 12px`, `rounded: md`, 1px border in `*-border`, transparent background. Flag is a native emoji at 14px. Code uses `numeric-sm`. Chevron rotates 180° on open over 200ms.

The dropdown menu opens 6px below, right-aligned, `min-width: 180px`, padding 6px, `rounded: lg`, `*-surface-elevated` background, `shadow-lg`. Each row: padding `8px 10px`, `rounded: sm`, `gap: 10px`. Selected row gets `*-primary-faded` background plus a trailing `Check` icon (size 14, stroke 2.4) in the theme-resolved accent.

Supported languages: EN, ES, DE, FR, IT, PL — each shown as native emoji flag + native-language name (English, Español, Deutsch, Français, Italiano, Polski) + code.

### Theme toggle

38×38 square, `rounded: md`, 1px `*-border`, transparent background. Renders `Sun` (size 16) when current theme is dark; `Moon` (size 16) when current theme is light. Hover: `*-primary-faded` background. Active press: `transform: scale(0.95)`. ARIA label: "Toggle theme".

### EU averages card

Floating card at top-left of map. Padding `14px 18px`, `rounded: xl`, `*-surface-raised`, 1px `*-border`, `shadow-sm`, `min-width: 220px`.

Eyebrow row (`gap: 6px`, `margin-bottom: 10px`): a 6px accent-colored dot with a 3px ring of `*-primary-faded`, followed by the `eyebrow` style label "EU AVERAGE" in `*-on-surface-subtle`.

Two side-by-side metrics separated by a 1px vertical divider in `*-border`, `gap: 24px`. Each metric stacks `label-sm` label in `*-on-surface-muted` (2px margin-bottom) above a `numeric-display` value in `*-on-surface`.

### Hint pill

Floating pill at bottom-right of map. Padding `8px 14px`, `rounded: full`, `*-surface-raised`, 1px `*-border`, `shadow-sm`. Content: 6px accent dot + label "Hover a country to view prices" in `body-sm`, color `*-on-surface-muted`.

### Tooltip

Floating element that follows the cursor while a country is hovered. `min-width: 240px`, padding 14px, `rounded: xl`, `*-surface-elevated`, 1px `*-border-strong`, `shadow-lg`. Appears with `ef-pop` (140ms). `pointer-events: none`.

Three stacked sections:

1. **Header.** Flag emoji (22px) + stacked country name (`headline-sm`, `*-on-surface`) and ISO code (`numeric-xs`, `*-on-surface-subtle`). Header row gap: 10px. Bottom margin: 12px.
2. **Price rows.** Two flex rows with `justify-content: space-between` and `gap: 8px` between rows. Label uses `body-sm` in `*-on-surface-muted`; value uses `numeric-md` in `*-on-surface`.
3. **Footer.** Padding-top 10px, separated by a 1px `*-border`. Contains a `Clock` icon (size 11, stroke 2.2) plus the timestamp "Updated Nh ago" in `caption` style, color `*-on-surface-subtle`.

### Map country path (SVG)

Each EU country renders as a single `<path>` element.

- *Default:* fill `*-map-fill`, stroke `*-map-stroke` at `0.8px`, `stroke-linejoin: round`, `cursor: pointer`.
- *Hover:* fill swaps to the theme-resolved accent (`primary` light, `accent-bright` dark); a `glow-hover` drop-shadow filter is added.
- *Transitions:* `fill 220ms ease, filter 220ms ease, transform 220ms ease`.
- `transform-origin: center` and `transform-box: fill-box` are pre-set in case future iterations animate scale.

### Skeleton loader (map loading state)

A 280×8 px bar with `rounded: full`, filled with a linear gradient `*-map-fill → *-primary-faded → *-map-fill` sized `200% 100%`, animated by `ef-shimmer`. Below the bar, a `caption` style "Loading EU borders…" message in `*-on-surface-subtle` with letter-spacing `0.05em`.

## Do's and Don'ts

- **Do** read tokens from the active theme on every render. The `accent` resolves to different hex values per theme; cached values will visibly desync.
- **Do** use `primary` only for elements that represent the brand. Use the theme-resolved accent for everything the user can interact with that lights up.
- **Do** render every numeral — prices, ISO codes, language codes — in JetBrains Mono with `font-variant-numeric: tabular-nums`.
- **Do** pair every drop-shadow with a 1px border. The border is what keeps the element legible under reduced-transparency and on flat-color backgrounds.
- **Do** wrap all keyframe animations in `@media (prefers-reduced-motion: reduce)` and collapse them to instant transitions.
- **Do** keep three decimals on prices (`€1.689`) — it matches how European fuel pumps display them.
- **Do** keep the dark theme as the default for first-time users; persist subsequent choices to `localStorage` under the key `eurofuel:theme`.

- **Don't** use pure white (`#FFFFFF`) or pure black (`#000000`) as a page background. Surfaces are warm in light mode, marine in dark mode.
- **Don't** use Roboto, Inter, Arial, or any other default-feeling sans-serif as the UI font. Manrope is the only UI font.
- **Don't** set numerals in a proportional font. Ever.
- **Don't** use `primary` for an interactive highlight in dark mode — it doesn't have enough contrast against the marine background. Use `accent-bright`.
- **Don't** mix corner radii within a single component group. Pick the smallest radius that reads as "this is a container" and stick with it across siblings.
- **Don't** introduce purple gradients, neon glows, or saturated rainbow accents. The palette is two blues and a set of warm/cool greys.
- **Don't** animate longer than 320ms or use bouncing/springing easing curves for UI affordances. Springs are reserved for nothing in this system.
- **Don't** rely on hover-only information to communicate state. The country tooltip is hover-driven and must be paired with a keyboard-accessible alternative before shipping.
- **Don't** hardcode hex values inside components. Read from the theme object so a future palette swap is one file.
