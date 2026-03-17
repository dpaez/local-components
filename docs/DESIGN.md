# DESIGN.md - local-components Design System

> **Purpose**: Single source of truth for AI assistants working on local-components. This document establishes design guidelines, patterns, and anti-patterns to ensure consistency across all AI-generated code and design decisions.

**Last Updated**: 2026-03-10  
**Applies To**: All AI assistants working with local-components  
**Status**: Living document - update when design changes

---

## 1. Design Philosophy

### Core Approach

**Minimalistic, content-first design that lets content breathe.**

- **Neutral Foundation**: Off-black/off-white base that works in both light and dark modes
- **Strategic Accents**: Limited use of primary and secondary colors for emphasis only
- **System Performance**: System fonts, no external font loading, minimal bundle impact
- **Semantic First**: HTML structure drives design, not the other way around

### Brand Personality

**3 Words**: Minimal, Technical, Refined

- **Minimal**: Clean lines, generous whitespace, no visual clutter
- **Technical**: Precise engineering aesthetic, proper typography hierarchy
- **Refined**: Polished details, consistent spacing, subtle interactions

### Emotional Goals

- **Confidence**: Users trust the interface feels professional and reliable
- **Clarity**: Information is scannable and easy to digest
- **Calm**: No jarring colors or aggressive animations

---

## 2. Color Palette

### Base Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `oklch(0.989 0.004 286.327)` | `oklch(0.073 0.018 280.915)` | Page background |
| `--foreground` | `oklch(0.118 0.046 280.655)` | `oklch(0.94 0.026 288.318)` | Primary text |
| `--card` | `oklch(0.989 0.004 286.327)` | `oklch(0.586 0.204 276.8)` | Card backgrounds |
| `--card-foreground` | `oklch(0.147 0.018 272.544)` | `oklch(0.962 0.018 272)` | Card text |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `oklch(0.5 0.25 272.55)` | CTAs, links, key interactive elements |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary backgrounds |
| `--secondary` | `oklch(0.7134 0.1799 47.45)` | Warm orange/coral accents, highlights |
| `--secondary-foreground` | `oklch(0.985 0 0)` | Text on secondary backgrounds |

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.4 0.12 272.54)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.93 0.033 272.5)` | Secondary text |
| `--accent` | `oklch(0.892 0.0373 218.0047)` | `oklch(0.49 0.22 264)` | Accent highlights |
| `--border` | `oklch(0.922 0 0)` | `oklch(0.93 0.033 272.5)` | Borders and dividers |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.6542 0.2213 36.52)` | Error states |

### Primary Scale (for gradients/depth)

```
--primary-50:  oklch(0.962 0.018 272)
--primary-100: oklch(0.93 0.033 272.5)
--primary-200: oklch(0.87 0.062 273.7)
--primary-300: oklch(0.786 0.104 274.3)
--primary-400: oklch(0.681 0.158 276.5)
--primary-500: oklch(0.586 0.204 276.8)
--primary-600: oklch(0.511 0.23 276.7)
--primary-700: oklch(0.457 0.215 276.8)
--primary-800: oklch(0.399 0.177 277.1)
--primary-900: oklch(0.359 0.135 278.4)
```

### Color Usage Rules

- **Primary** (`--primary`): Use for buttons, active links, key interactive elements
- **Secondary** (`--secondary`): Use sparingly for highlights, warm accents, decorative elements
- **Muted** (`--muted`): Use for secondary text, inactive states, subtle backgrounds
- **Border**: Use for dividers, card borders, section separations

**AVOID**:
- Using more than 2 accent colors in any component
- Pure black (#000) or pure white (#fff) - always use the off-black/off-white tokens
- Saturated colors (>80% saturation)

---

## 3. Typography System

### Font Stack

```css
--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';

--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
```

**Note**: We use system fonts for performance. No external font loading.

### Type Scale

| Level | Size | Weight | Line-Height | Usage |
|-------|------|--------|-------------|-------|
| **Display** | `text-4xl md:text-6xl` | 700-900 | `leading-none` | Hero headlines |
| **H1** | `text-3xl md:text-5xl` | 700 | `leading-tight` | Page titles |
| **H2** | `text-2xl md:text-4xl` | 600 | `leading-tight` | Section titles |
| **H3** | `text-xl md:text-2xl` | 600 | `leading-snug` | Subsection titles |
| **Body** | `text-base` | 400 | `leading-relaxed` (1.6-1.8) | Paragraphs |
| **Small** | `text-sm` | 400 | `leading-relaxed` | Captions, metadata |
| **Caption** | `text-xs` | 300-400 | `leading-relaxed` | Footnotes, timestamps |

### Typography Patterns

**Headings**:
- Use `Heading` component with `as` prop for semantic hierarchy
- Default weights: h1=bold, h2=semibold, h3=semibold
- Always tight line-height for headlines

**Body Text**:
- Use `Text` component or semantic elements (p, span)
- Max-width: `max-w-[65ch]` for optimal reading
- Color: `--muted-foreground` for secondary text

**Code/Mono**:
- Use `--font-mono` for code blocks
- Background: subtle `bg-muted` with rounded corners

---

## 4. Component Usage Guide

### When to Use Which Component

| Need | Use | Don't Use |
|------|-----|-----------|
| Landing section | `Hero` | Custom div with background |
| Page wrapper | `Layout` | Manual theme handling |
| Content grouping | `Section` | Manual section elements |
| Text hierarchy | `Heading`, `Text`, `Lead` | Manual h1-h6 tags |
| Content cards | `Card` | Manual border/padding divs |
| Actions | `Button` | Manual styled buttons |
| Theme toggle | `Toggle` | Manual implementation |
| Tags/labels | `Badge` | Manual styled spans |

### Component Patterns

#### Hero
- **Use for**: Landing sections, top-of-page headers
- **Background types**: `image`, `color`, `gradient`, `mesh`
- **Alignment**: `left`, `center`, `right` (responsive)
- **CTA**: Optional button with label and href
- **Sizing**: Always use `min-h-[100dvh]` (not `h-screen`)

#### Layout
- **Use for**: Root app wrapper, theme provider
- **Features**: Container width, padding, centering
- **Theme**: Supports `light`, `dark`, `system`
- **MaxWidth**: `sm`, `md`, `lg`, `xl`, `full`

#### Section
- **Use for**: Logical content grouping
- **Background**: `default`, `alternate`, `primary`, `accent`
- **Spacing**: `compact` (py-8), `default` (py-16), `spaced` (py-24)
- **Anchor**: Use `id` prop for section navigation

#### Typography (Heading, Text, Lead)
- **Polymorphic**: Use `as` prop to change semantic element
- **Responsive**: Sizes adapt automatically on mobile
- **Color**: Inherits from parent or use `className` for overrides

#### Card
- **Variants**: `default`, `bordered`, `ghost`, `elevated`
- **Features**: Image support, footer slot, link wrapping (`href`)
- **Hover**: Elevated variant lifts on hover
- **asChild**: Support for custom wrapper elements

#### Button
- **Variants**: `primary`, `secondary`, `ghost`, `outline`, `cta`
- **Sizes**: `sm`, `medium` (default), `lg`, `icon`
- **Icons**: Support for `icon` prop with `iconPosition` ('start' | 'end')
- **CTA variant**: Animated gradient border for high-emphasis actions
- **asChild**: Render as link or other element

#### Toggle
- **Variants**: `icon`, `button`, `switch`
- **Theme integration**: Consumes `useTheme()` from Layout
- **Icons**: Sun (light mode), Moon (dark mode)
- **Accessibility**: `aria-label`, keyboard accessible

#### Badge
- **Variants**: `default`, `secondary`, `outline`, `destructive`
- **Features**: Optional icon, dismissible with close button
- **Usage**: Tags, labels, status indicators

---

## 5. Design Principles

### Principle 1: Minimalistic Approach
**Let content breathe.**

- Generous whitespace between sections (`py-16` to `py-24`)
- No unnecessary borders or dividers
- Information density: Low to medium (art gallery mode, not cockpit mode)
- **AVOID**: Crowded layouts, tight spacing, visual noise

### Principle 2: Strategic Color Use
**Colors have specific jobs.**

- **Primary** (`--primary`): Only for CTAs, links, active states
- **Secondary** (`--secondary`): Accents, highlights, warm touches
- **Neutral**: Everything else (backgrounds, text, borders)
- **AVOID**: Using multiple accent colors, rainbow palettes, gradient backgrounds

### Principle 3: System Fonts for Performance
**No external font dependencies.**

- Always use `--font-sans` (system font stack)
- No @font-face imports
- No web font loading (Google Fonts, Adobe Fonts, etc.)
- **AVOID**: Custom fonts, icon fonts (use SVG icons instead)

### Principle 4: Subtle Interactions
**Interactions should feel responsive but calm.**

- Transitions: 150-300ms (smooth but quick)
- Easing: `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)`
- Hover states: Subtle opacity or background changes
- **AVOID**: Bounce animations, elastic easing, long animations

### Principle 5: Semantic HTML and Accessibility
**Structure drives design.**

- Use semantic elements: `<section>`, `<article>`, `<nav>`, `<button>`
- Headings in order: h1 → h2 → h3 (no skips)
- All interactive elements keyboard accessible
- Respect `prefers-reduced-motion`
- **AVOID**: Div soup, missing ARIA labels, inaccessible custom components

---

## 6. Inspiration & References

### DASEIN (roicort.github.io/dasein)

**Key Takeaways**:
- Clean layout structure with generous whitespace
- Strong typographic hierarchy (large headlines, readable body)
- Section-based content organization
- Minimal color palette (monochromatic with single accent)

**Apply To**: Layout, Section, Typography components

### SARAL (yashjawale.in/saral-theme-astro/)

**Key Takeaways**:
- Card-based content presentation
- Consistent typography treatment
- Minimal layout approach
- Focus on content readability

**Apply To**: Card component, typography patterns

### Implementation Notes

When implementing features:
1. Study both reference sites for layout inspiration
2. Adapt patterns to local-components' color system
3. Maintain the minimal, technical aesthetic
4. Ensure responsive behavior matches references

---

## 7. Anti-Patterns (AVOID)

### Visual Anti-Patterns

| AVOID | PREFER |
|-------|--------|
| Emojis in code/content | SVG icons (Lucide, custom) |
| "AI Purple/Blue" aesthetic | Neutral base + strategic primary accent |
| Pure black (#000) / white (#fff) | Off-black/off-white tokens |
| Rounded elements with thick colored borders | Clean edges, subtle borders |
| Gradient text | Solid color text |
| Generic glassmorphism | Solid backgrounds, subtle shadows |
| `h-screen` for heroes | `min-h-[100dvh]` |
| Complex flexbox percentage math | CSS Grid (`grid-cols-* gap-*`) |
| Saturated colors (>80%) | Muted, professional color palette |
| Decorative patterns/textures | Clean, solid backgrounds |

### Code Anti-Patterns

| AVOID | PREFER |
|-------|--------|
| `any` types | Strict TypeScript |
| Inline styles | Tailwind utility classes |
| CSS-in-JS (styled-components) | Tailwind + CSS variables |
| JavaScript Tailwind config | CSS-first Tailwind v4 |
| Barrel exports | Individual component imports |
| Prop drilling | React Context (useTheme) |
| Manual className concatenation | `cn()` utility (tailwind-merge + clsx) |

### Layout Anti-Patterns

| AVOID | PREFER |
|-------|--------|
| Centered content only | Left-aligned content for variance |
| Equal column widths | Asymmetric layouts (2fr 1fr) |
| Tight spacing | Generous whitespace |
| Card grids for everything | Negative space, minimal containers |
| Full-width images without constraints | Aspect-ratio constrained images |

---

## 8. Theme System

### Theme Behavior

**Light Mode**:
- Background: Off-white (warm gray)
- Text: Off-black
- Cards: White/very light gray
- Shadows: Black with low opacity

**Dark Mode**:
- Background: Off-black (deep blue-gray)
- Text: Off-white
- Cards: Primary-600 with reduced opacity
- Shadows: Primary color for depth

### Theme Detection

```typescript
// Theme initialization order:
1. Check localStorage (key: 'local-components-theme')
2. If not set, check prefers-color-scheme
3. Default to 'light'
```

### CSS Variables Strategy

- **Primitive tokens**: Not used (semantic only)
- **Semantic tokens**: `--background`, `--primary`, `--border`, etc.
- **Mode switching**: Redefine semantic tokens in `.dark` class
- **No runtime JS**: All theme logic in CSS variables

---

## 9. Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 0.25rem (4px) | Minimal gaps |
| `sm` | 0.5rem (8px) | Tight spacing |
| `md` | 1rem (16px) | Standard spacing |
| `lg` | 2rem (32px) | Section padding |
| `xl` | 4rem (64px) | Large gaps |
| `2xl` | 8rem (128px) | Section separations |

### Layout Patterns

**Container**:
- Max-width: `max-w-7xl` (80rem / 1280px) or `max-w-[1400px]`
- Centering: `mx-auto`
- Padding: `px-4 sm:px-6 lg:px-8`

**Grid**:
- Use CSS Grid for layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap: `gap-4` to `gap-8`
- **AVOID**: Complex flexbox percentage math

**Responsive Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 10. Accessibility Standards

### WCAG Compliance

- **Contrast**: 4.5:1 minimum for text (AA), 7:1 for large text (AAA)
- **Interactive elements**: Visible focus indicators
- **Keyboard navigation**: All interactive elements accessible via Tab
- **Screen readers**: Semantic HTML, ARIA labels where needed

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  .animate-border-gradient::before {
    animation: none;
  }
}
```

**Always respect**: `prefers-reduced-motion: reduce`

### Focus States

- Never remove focus indicators without replacement
- Use `focus-visible` for keyboard-only focus
- Ensure focus states have sufficient contrast

---

## 11. Design Tokens Reference

### Quick Reference Table

| CSS Variable | Light Value | Dark Value | Tailwind Class |
|--------------|-------------|------------|----------------|
| `--background` | `oklch(0.989 0.004 286.327)` | `oklch(0.073 0.018 280.915)` | `bg-background` |
| `--foreground` | `oklch(0.118 0.046 280.655)` | `oklch(0.94 0.026 288.318)` | `text-foreground` |
| `--primary` | `oklch(0.5 0.25 272.55)` | `oklch(0.4 0.2467 272.54)` | `bg-primary` |
| `--secondary` | `oklch(0.7134 0.1799 47.45)` | `oklch(0.66 0.1799 47.45)` | `bg-secondary` |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.4 0.12 272.54)` | `bg-muted` |
| `--border` | `oklch(0.922 0 0)` | `oklch(0.93 0.033 272.5)` | `border-border` |
| `--radius` | `0.625rem` (10px) | Same | `rounded-md` |

### Custom Properties

```css
/* Animation */
--animate-rotate-border: border-rotate 3s linear infinite;

/* Shadows (Light) */
--shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
--shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
--shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);

/* Shadows (Dark) - use color-mix with card color */
--shadow-2xs: 0 1px 3px 0px color-mix(in oklch, var(--shadow-color) 5%, transparent);
```

### File Location

All design tokens defined in: `styles/globals.css`

---

## Cross-References

- **PRD.md**: Product requirements, user stories, design inspiration (DASEIN, SARAL)
- **TDD.md**: Technical architecture, component APIs, build system
- **TASKS.md**: Implementation roadmap and task tracking
- **globals.css**: Source of truth for CSS design tokens
- **Storybook**: Interactive component documentation (`bunx storybook dev`)

---

## For AI Assistants: Quick Decision Guide

**Q: Which color should I use for a button?**  
A: Primary (`--primary`) for main CTAs, secondary for alternatives, ghost for subtle actions.

**Q: How should I space sections?**  
A: Use `Section` component with `spacing='spaced'` (py-24) for major sections, `spacing='default'` (py-16) for regular content.

**Q: What font should I use?**  
A: System fonts only (`--font-sans`). Never add external fonts.

**Q: Can I use emojis?**  
A: NO. Use SVG icons instead.

**Q: Should I center this content?**  
A: Center for heroes, left-align for content sections (following DASEIN pattern).

**Q: What's the hero height?**  
A: Always `min-h-[100dvh]`, never `h-screen`.

**Q: Can I add a gradient background?**  
A: Subtle gradients only using theme colors (`--background` to `--muted`). No rainbow gradients.

**Q: How do I handle dark mode?**  
A: Use CSS variables. They automatically switch in `.dark` class. Don't write manual dark mode logic.

---

**End of DESIGN.md**
