# Task List - local-components Implementation

This document provides detailed implementation tasks for the local-components library. Each task follows the artifact format with overview, deliverable, dependencies, acceptance criteria, references, out of scope, and tips.

## Phase 1: Foundation (Infrastructure & Core)

### Task 1: Update Tailwind CSS v4 Configuration with Design Tokens ✅ COMPLETED

**Overview**: Update the existing `styles/globals.css` to match the design system specified in the PRD with the correct color palette (off-black/off-white foundation with primary and accent colors).

**Deliverable**: 
- Updated `styles/globals.css` with:
  - Off-white (#efefef) and off-black (#121212) as base colors
  - Primary: oklch(0.5007 0.2524 272.54) - Deep blue/purple
  - Accent: oklch(0.7134 0.1799 47.45) - Warm orange/coral
  - Semantic colors for cards, muted, borders, inputs, rings
  - Proper dark mode variants
  - Tailwind v4 `@theme inline` syntax

**Dependencies**: None (can be done first)

**Acceptance Criteria**:
- [x] Colors match exact values from PRD Section "Color Palette"
- [x] Light mode uses #efefef background with #121212 foreground
- [x] Dark mode uses #121212 background with #efefef foreground
- [x] Primary and accent colors use exact OKLCH values
- [x] CSS validates without errors
- [x] Tailwind classes compile correctly

**References**:
- PRD.md: "Color Palette" section (lines 234-248)
- TDD.md: Technology Stack CSS configuration (lines 538-609)
- Skill: fullstack-skill/rules/tailwind-v4.md

**Out of Scope**:
- Design tokens abstraction layer (ADR for future)
- CSS-in-JS runtime (explicitly excluded)
- Custom theme variants beyond light/dark

**Tips**:
- Use CSS-first Tailwind v4 configuration (no tailwind.config.js)
- The @theme inline block maps CSS variables to Tailwind utility classes
- Use @custom-variant dark (&:is(.dark *)) for dark mode
- Keep the existing structure but replace color values

---

### Task 2: Implement Theme Context System ✅ COMPLETED

**Overview**: Create the theme context module in `src/lib/theme-context/` that manages theme state, localStorage persistence, OS preference detection, and provides the useTheme hook.

**Deliverable**:
- `src/lib/theme-context/theme-context.tsx` with:
  - ThemeProvider component
  - useTheme hook
  - localStorage read/write with configurable key
  - prefers-color-scheme detection
  - 'dark' class injection on HTML element
- `src/lib/theme-context/index.ts` with exports

**Dependencies**: None (foundation module)

**Acceptance Criteria**:
- [x] Theme type: 'light' | 'dark' | 'system'
- [x] resolvedTheme always returns 'light' | 'dark' (system resolved)
- [x] Default storage key: 'local-components-theme'
- [x] Theme initialization: localStorage > OS preference > 'light' default
- [x] Theme changes persist to localStorage
- [x] Dark class applied/removed from document.documentElement
- [x] useTheme hook returns { theme, resolvedTheme, setTheme, toggleTheme }
- [x] No SSR errors (safe window/document access)
- [x] Event listeners cleaned up on unmount

**References**:
- TDD.md: Theme System Architecture (lines 229-297)
- TDD.md: Theme Context API (lines 469-490)
- PRD.md: Theme System Architecture (lines 109-133)

**Out of Scope**:
- Real-time OS theme sync while site is open (detects on load only)
- Multiple custom themes
- Design tokens abstraction

**Tips**:
- Use React.createContext and React.useContext
- Check localStorage only in useEffect (after mount) for SSR safety
- Use MutationObserver if you need cross-tab sync (optional)
- Debounce localStorage writes (16ms)
- Keep window.matchMedia listener for prefers-color-scheme

---

### Task 3: Update Package.json with Exports Map ✅ COMPLETED

**Overview**: Configure package.json to support tree-shakeable imports with proper exports map for ESM-only distribution. No barrel exports.

**Deliverable**:
- Updated `package.json` with:
  - "type": "module" (already set)
  - "exports" map for tree-shakeable imports
  - "sideEffects": false
  - Peer dependencies: react ^19, react-dom ^19
  - Clean separation of dependencies vs devDependencies

**Dependencies**: None

**Acceptance Criteria**:
- [x] Exports map supports:
  - `local-components/components/*` (individual components)
  - `local-components/lib/*` (utilities and theme)
  - `local-components/styles/*` (CSS files)
- [x] Each export has "import" and "types" fields
- [x] "sideEffects": false for tree-shaking
- [x] React and ReactDOM are peerDependencies
- [x] All other deps are devDependencies

**References**:
- TDD.md: Package.json Exports Map (lines 838-859)
- TDD.md: Module Architecture (lines 127-157)

**Out of Scope**:
- CommonJS support (ESM only)
- npm publishing workflow (future)

**Tips**:
- The exports map pattern enables: `import { Hero } from 'local-components/components/hero'`
- This is critical for tree-shaking (only import what you need)
- Make sure to specify types for TypeScript support
- Verify with `npm pack --dry-run` to see what gets published

---

## Phase 2: Component Implementation (High Priority)

### Task 4: Build Button Component

**Overview**: Create the Button component with variants (primary, ghost, outline, disabled), icon support, and asChild composition pattern.

**Deliverable**:
- `src/components/button/button.tsx` with:
  - buttonVariants using class-variance-authority
  - Button component with asChild support
  - Icon support with positioning (start/end)
  - Keyboard accessibility (Space/Enter)
- `src/components/button/index.ts` with exports

**Dependencies**: 
- Task 1 (Tailwind config for colors)
- Task 3 (package.json structure)

**Acceptance Criteria**:
- [ ] Variants: 'primary', 'ghost', 'outline', 'disabled'
- [ ] Sizes: 'default', 'sm', 'icon'
- [ ] asChild prop works with Radix Slot
- [ ] icon prop accepts React.ReactNode
- [ ] iconPosition: 'start' | 'end' (default: 'start')
- [ ] Keyboard accessible (native button behavior)
- [ ] data-slot="button" attribute for debugging
- [ ] Uses cn() utility for class merging
- [ ] buttonVariants exported for reuse
- [ ] Renders without console errors

**References**:
- TDD.md: Button Component API (lines 426-438)
- PRD.md: Button Component Specification (lines 185-193)
- TDD.md: Component Architecture Pattern (lines 174-227)
- Skill: fullstack-skill/rules/shadcn-components.md

**Out of Scope**:
- Loading states (no spinner/loading prop)
- Button groups
- Split buttons

**Tips**:
- Follow shadcn/ui pattern: use CVA for variants, cn() for merging
- Use @radix-ui/react-slot for asChild (already in dependencies)
- Primary variant should use bg-primary text-primary-foreground
- Ghost variant for subtle actions, outline for bordered
- Remember: `const Comp = asChild ? Slot : 'button'` pattern

---

### Task 5: Build Layout Component with ThemeProvider

**Overview**: Create the Layout component that provides page structure, responsive container, AND integrates the ThemeProvider from Task 2.

**Deliverable**:
- `src/components/layout/layout.tsx` with:
  - Layout component wrapping ThemeProvider
  - Container with maxWidth, padding, centered props
  - HTML dark class management
- `src/components/layout/index.ts` with exports

**Dependencies**:
- Task 2 (Theme Context)
- Task 1 (Tailwind config)
- Task 3 (package.json)

**Acceptance Criteria**:
- [ ] maxWidth prop: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- [ ] padding prop: 'none' | 'sm' | 'md' | 'lg'
- [ ] centered prop for centering content
- [ ] defaultTheme prop: 'light' | 'dark' | 'system'
- [ ] storageKey prop for localStorage key
- [ ] Integrates ThemeProvider internally
- [ ] Applies dark class to HTML element
- [ ] Responsive container using Tailwind max-w-* classes
- [ ] Proper TypeScript types exported

**References**:
- TDD.md: Layout Component API (lines 357-370)
- PRD.md: Layout Component Specification (lines 143-154)
- TDD.md: Theme System Architecture (lines 229-266)

**Out of Scope**:
- Grid system (keep it simple - container only)
- Header/Footer components (future)
- Sidebar layout

**Tips**:
- Layout is both a visual component AND the ThemeProvider wrapper
- Import ThemeProvider from lib/theme-context
- Use semantic HTML (main or div with role="main")
- Container queries can be added later if needed
- The dark class logic is handled by ThemeProvider, Layout just renders children

---

### Task 6: Build Toggle (ThemeToggle) Component

**Overview**: Create the ThemeToggle component that consumes the theme context and allows users to switch between light and dark modes.

**Deliverable**:
- `src/components/toggle/toggle.tsx` with:
  - Toggle component consuming useTheme hook
  - Sun icon for light mode, Moon icon for dark mode
  - Icon transition animations
  - Keyboard accessibility
- `src/components/toggle/sun-icon.tsx` (SVG component)
- `src/components/toggle/moon-icon.tsx` (SVG component)
- `src/components/toggle/index.ts` with exports

**Dependencies**:
- Task 2 (Theme Context)
- Task 1 (Tailwind config)
- Task 3 (package.json)
- lucide-react (already in deps) OR custom SVGs

**Acceptance Criteria**:
- [ ] Variants: 'icon' | 'button' | 'switch'
- [ ] showLabel prop for text label visibility
- [ ] Consumes useTheme() from lib/theme-context
- [ ] Displays sun icon when resolvedTheme is 'light'
- [ ] Displays moon icon when resolvedTheme is 'dark'
- [ ] Calls toggleTheme() on click
- [ ] Keyboard accessible (Space/Enter)
- [ ] ARIA attributes: aria-label, role="switch"
- [ ] Respects prefers-reduced-motion
- [ ] Smooth icon transitions (CSS)

**References**:
- TDD.md: Toggle Component API (lines 372-382)
- PRD.md: ThemeToggle Specification (lines 173-184)
- PRD.md: User Stories 6, 8 (lines 40-45)

**Out of Scope**:
- System theme option in toggle (just light/dark toggle)
- Custom icon sets
- Animation libraries (CSS only)

**Tips**:
- Use lucide-react icons (Sun and Moon) for simplicity
- Or create custom SVGs for unique styling
- Toggle should be simple: click to toggle between light and dark
- The resolvedTheme (actual theme) determines icon, not the 'system' setting
- Wrap icons in AnimatePresence or use CSS transitions
- aria-label should indicate current state and action

---

## Phase 3: Component Implementation (Medium Priority)

### Task 7: Build Typography Components

**Overview**: Create typography components (Heading, Text, Lead, Blockquote, Code) with semantic HTML support, polymorphic rendering, and responsive sizing.

**Deliverable**:
- `src/components/typography/heading.tsx` - h1-h6 with size overrides
- `src/components/typography/text.tsx` - paragraphs and spans
- `src/components/typography/lead.tsx` - emphasized paragraphs
- `src/components/typography/blockquote.tsx` - styled quotes
- `src/components/typography/code.tsx` - inline code
- `src/components/typography/index.ts` with all exports

**Dependencies**:
- Task 1 (Tailwind config)
- Task 3 (package.json)

**Acceptance Criteria**:
- [ ] Heading: as prop for h1-h6, size prop for scale
- [ ] Text: as prop for p, span, etc.
- [ ] Lead: larger, emphasized text style
- [ ] Blockquote: styled with left border
- [ ] Code: inline monospace with background
- [ ] All components support className prop
- [ ] Semantic HTML by default
- [ ] Responsive text sizes (text-sm, text-base, text-lg, etc.)
- [ ] Dark mode text colors via dark: variants
- [ ] Proper font stack (system fonts)

**References**:
- TDD.md: Typography Component API (lines 440-452)
- PRD.md: Typography Specification (lines 161-166)
- TDD.md: Design System Typography (lines 249-257)

**Out of Scope**:
- Rich text/markdown rendering
- Prose styling for long-form content
- Font loading (use system fonts only)

**Tips**:
- Use polymorphic components with `as` prop
- Heading defaults: h1 = size 2xl, h2 = xl, etc.
- Lead should be slightly larger with text-muted-foreground
- Code: use font-mono with subtle background
- Dark mode: use dark:text-* classes automatically

---

### Task 8: Build Card Component

**Overview**: Create the Card component for content containers with image support, hover states, and optional link wrapping.

**Deliverable**:
- `src/components/card/card.tsx` with:
  - Card component with variants
  - Image support
  - Footer slot
  - Link wrapping (if href provided)
  - asChild support
- `src/components/card/index.ts` with exports

**Dependencies**:
- Task 1 (Tailwind config)
- Task 3 (package.json)

**Acceptance Criteria**:
- [ ] title prop (optional)
- [ ] description prop (optional)
- [ ] image prop with src and alt
- [ ] footer prop for React.ReactNode
- [ ] href prop for link wrapping
- [ ] Variants: 'default', 'bordered', 'ghost', 'elevated'
- [ ] Hover states for interactive cards
- [ ] asChild support with Radix Slot
- [ ] Handles overflow gracefully
- [ ] Dark mode border/background adjustments

**References**:
- TDD.md: Card Component API (lines 407-424)
- PRD.md: Card Specification (lines 167-172)
- PRD.md: Design Inspiration SARAL (lines 228-231)

**Out of Scope**:
- Card actions (buttons in header)
- Expandable/collapsible cards
- Card grids (consumer composes multiple cards)

**Tips**:
- If href is provided, wrap in anchor tag or use asChild
- Use aspect-ratio for consistent image sizing
- Elevated variant: use shadow-lg, subtle lift on hover
- Bordered: use border-2 for emphasis
- Ghost: transparent background, subtle border

---

### Task 9: Build Section Component

**Overview**: Create the Section component for logical content grouping with consistent spacing, anchor link support, and background variations.

**Deliverable**:
- `src/components/section/section.tsx` with:
  - Section component with variants
  - Title and subtitle support
  - Anchor link support (id prop)
  - Background variations
- `src/components/section/index.ts` with exports

**Dependencies**:
- Task 1 (Tailwind config)
- Task 3 (package.json)

**Acceptance Criteria**:
- [ ] title prop (optional) with styling
- [ ] subtitle prop (optional)
- [ ] id prop for anchor links (#section-id)
- [ ] background: 'default' | 'alternate' | 'primary' | 'accent'
- [ ] spacing: 'compact' | 'default' | 'spaced'
- [ ] Semantic section element
- [ ] Consistent padding (py-12, py-16, py-24 based on spacing)
- [ ] Respects theme (light/dark backgrounds)

**References**:
- TDD.md: Section Component API (lines 454-467)
- PRD.md: Section Specification (lines 155-160)
- PRD.md: Design Inspiration DASEIN (lines 221-226)

**Out of Scope**:
- Grid layouts inside section (consumer handles)
- Parallax backgrounds
- Full-bleed sections with background images

**Tips**:
- Use semantic `<section>` element
- Title should use Heading component (Heading h2 default)
- Alternate background: slightly different from main bg
- Primary/Accent: use brand colors for backgrounds
- Spacing: compact (py-8), default (py-16), spaced (py-24)

---

### Task 10: Build Hero Component

**Overview**: Create the Hero component for landing sections with background support, CTA button, and responsive text sizing.

**Deliverable**:
- `src/components/hero/hero.tsx` with:
  - Hero component with variants
  - Background image/color/gradient support
  - CTA button integration
  - asChild support
- `src/components/hero/index.ts` with exports

**Dependencies**:
- Task 1 (Tailwind config)
- Task 3 (package.json)
- Task 4 (Button component - for CTA)

**Acceptance Criteria**:
- [ ] title prop (required)
- [ ] subtitle prop (optional)
- [ ] cta prop: { label, href, variant }
- [ ] background: { type: 'image' | 'color' | 'gradient', value }
- [ ] alignment: 'left' | 'center' | 'right'
- [ ] Variants: 'default', 'minimal', 'split', 'full-bleed'
- [ ] Responsive text sizing (text-4xl → text-6xl)
- [ ] asChild support for custom wrapper
- [ ] Dark mode compatible backgrounds

**References**:
- TDD.md: Hero Component API (lines 384-405)
- PRD.md: Hero Specification (lines 137-142)
- PRD.md: User Story 1 (lines 31-32)

**Out of Scope**:
- Animation/entrance effects (CSS only)
- Background video support
- Multi-column hero layouts

**Tips**:
- Split variant: image on one side, text on other
- Full-bleed: edge-to-edge background
- Use object-cover for background images
- CTA can use Button component
- Text should have text-shadow or contrasting background for readability

---

## Phase 4: Exports & Barrel Files

### Task 11: Create Barrel Exports

**Overview**: Create index.ts barrel files for each component directory and a main barrel export for convenience imports.

**Deliverable**:
- `src/components/button/index.ts` - exports Button, ButtonProps, buttonVariants
- `src/components/layout/index.ts` - exports Layout, LayoutProps
- `src/components/toggle/index.ts` - exports Toggle, ToggleProps
- `src/components/typography/index.ts` - exports all typography components
- `src/components/card/index.ts` - exports Card, CardProps
- `src/components/section/index.ts` - exports Section, SectionProps
- `src/components/hero/index.ts` - exports Hero, HeroProps
- `src/lib/theme-context/index.ts` - exports ThemeProvider, useTheme, types
- `src/lib/utils/index.ts` - exports cn (reorganize from utils.ts)
- Update `src/index.ts` to be a barrel export (currently a server)

**Dependencies**:
- All component tasks (4-10)

**Acceptance Criteria**:
- [ ] Each component has index.ts with type exports
- [ ] Named exports only (no default exports)
- [ ] Type exports use `export type` syntax
- [ ] Main src/index.ts exports all components
- [ ] lib/utils is reorganized with index.ts
- [ ] All exports follow pattern: export { Component, type ComponentProps }

**References**:
- TDD.md: Public API Surface (lines 301-353)
- TDD.md: Import Patterns (lines 159-172)
- Skill: fullstack-skill/rules/typescript-strict.md (verbatimModuleSyntax)

**Out of Scope**:
- Deep path exports beyond components/* and lib/*
- CJS exports (ESM only)

**Tips**:
- Use `export type` for type-only exports (helps with verbatimModuleSyntax)
- Barrel exports are for convenience, but tree-shaking works on subpath imports
- Main index.ts should re-export from component index files

---

## Phase 5: Storybook Setup & Stories

### Task 12: Setup Storybook

**Overview**: Configure Storybook 10+ for component documentation with theme switching support.

**Deliverable**:
- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Preview settings with theme decorator
- `.storybook/preview-head.html` - Inject theme script (optional)
- `.storybook/theme-decorator.tsx` - Theme toggle decorator
- Update package.json with storybook scripts

**Dependencies**:
- Task 1 (Tailwind config)
- Task 2 (Theme Context)

**Acceptance Criteria**:
- [ ] Storybook 10+ configured with @storybook/react-vite
- [ ] @storybook/addon-themes for theme switching
- [ ] @storybook/addon-essentials included
- [ ] TypeScript support configured
- [ ] Theme decorator applies dark/light class
- [ ] All stories support theme toggle
- [ ] Build works: `bunx storybook build`
- [ ] Dev server works: `bunx storybook dev`

**References**:
- TDD.md: Storybook Structure (lines 1055-1069)
- TDD.md: Testing Strategy - Phase 1 (lines 715-761)
- PRD.md: Documentation Strategy (lines 194-199)

**Out of Scope**:
- Storybook deployment automation (future)
- Visual regression testing (Phase 2)

**Tips**:
- Use bun as package manager: `--package-manager bun`
- Theme decorator wraps stories in Layout or manually toggles dark class
- Configure stories pattern: `../src/**/*.stories.tsx`
- Preview-head.html can inject blocking script to prevent FOUC

---

### Task 13: Create Storybook Stories

**Overview**: Create .stories.tsx files for each component covering all variants and props.

**Deliverable**:
- `src/components/button/button.stories.tsx` - All button variants
- `src/components/layout/layout.stories.tsx` - Layout configurations
- `src/components/toggle/toggle.stories.tsx` - Toggle variants
- `src/components/typography/typography.stories.tsx` - All typography
- `src/components/card/card.stories.tsx` - Card variants
- `src/components/section/section.stories.tsx` - Section variations
- `src/components/hero/hero.stories.tsx` - Hero variants

**Dependencies**:
- Task 12 (Storybook setup)
- All component tasks (4-10)

**Acceptance Criteria**:
- [ ] Default story for each component
- [ ] Stories for all component variants
- [ ] Controls for all props
- [ ] Theme decorator applied to all stories
- [ ] Dark mode story for each component
- [ ] AsChild composition story (where applicable)
- [ ] No console errors in any story
- [ ] Responsive viewport testing enabled

**References**:
- TDD.md: Example Story Structure (lines 735-760)
- PRD.md: Testing Decisions (lines 275-328)
- TDD.md: Manual Test Checklist (lines 725-733)

**Out of Scope**:
- Interaction testing (play functions - future)
- Automated visual regression (Phase 2)
- MDX documentation (can add later)

**Tips**:
- Use `argTypes` to control prop values in UI
- Create variants as separate stories for easy comparison
- Include a "Kitchen Sink" story showing all features
- Test edge cases: long text, empty props, etc.
- Use globals to force theme: `globals: { theme: 'dark' }`

---

## Phase 6: Tooling & Build

### Task 14: Configure OXC Tooling

**Overview**: Setup oxlint and oxfmt for fast Rust-based linting and formatting.

**Deliverable**:
- `oxlint.json` or `.oxlintrc.json` - Lint rules
- `oxfmt.json` - Format configuration
- Update package.json with lint/format scripts
- Documentation on usage

**Dependencies**:
- All source code tasks completed

**Acceptance Criteria**:
- [ ] oxlint configured and passing
- [ ] oxfmt configured with consistent style
- [ ] Package.json scripts:
  - "lint": "oxlint src/"
  - "lint:fix": "oxlint src/ --fix"
  - "format": "oxfmt src/"
  - "format:check": "oxfmt --check src/"
- [ ] No lint errors in src/
- [ ] All files formatted consistently
- [ ] Experimental import sorting enabled (if available)

**References**:
- TDD.md: Non-Functional Requirements (lines 75-80)
- PRD.md: User Stories 17, 18 (lines 62-65)
- Skill: fullstack-skill/rules/oxc-tooling.md

**Out of Scope**:
- ESLint/Prettier (use OXC instead)
- Pre-commit hooks (future)

**Tips**:
- OXC is 50-100x faster than ESLint
- Configure import sorting with internalPattern: ["@/"]
- Use semi: false for cleaner code
- Single quotes for consistency
- Add oxc to devDependencies or use npx

---

### Task 15: Build System with Bun

**Overview**: Create the Bun build system for ESM-only library distribution with type declarations.

**Deliverable**:
- Update `build.ts` to build library components
- Type declaration generation
- Build output to `dist/` directory
- Verify tree-shaking works

**Dependencies**:
- Task 3 (Package.json exports)
- Task 11 (Barrel exports)
- All components

**Acceptance Criteria**:
- [ ] Build script outputs to `dist/`
- [ ] ESM format only (`--format esm`)
- [ ] Type declarations generated (`.d.ts` files)
- [ ] Individual component builds tree-shakeable
- [ ] Maintains directory structure: dist/components/*, dist/lib/*
- [ ] Build completes in <30s
- [ ] No build errors
- [ ] Output files are valid JavaScript

**References**:
- TDD.md: Deployment Plan (lines 791-822)
- TDD.md: Build Output Structure (lines 813-836)
- Existing: build.ts (lines 1-4801 in root)

**Out of Scope**:
- CJS build (ESM only)
- Watch mode (dev server handles this)
- Minification (consumer bundler handles this)

**Tips**:
- Use `bun build` with `--dts` for type declarations
- Build entry points: src/index.ts and individual component paths
- Use `--out-dir dist` and `--clean`
- Test with `node -e "import('./dist/index.js').then(m => console.log(Object.keys(m)))"`
- Verify tree-shaking with rollup-plugin-visualizer (optional)

---

### Task 16: Create README Documentation

**Overview**: Write comprehensive README with installation, usage, theme configuration, and component examples.

**Deliverable**:
- `README.md` with:
  - Quick start guide
  - Installation instructions
  - Usage examples for each component
  - Theme configuration guide
  - Import patterns (tree-shaking)
  - Component API overview
  - Contributing (brief)
  - License

**Dependencies**:
- All component tasks completed
- Task 12 (Storybook - mention it)

**Acceptance Criteria**:
- [ ] Installation: `npm install local-components` (for future)
  - And local: clone and build
- [ ] Quick start code example
- [ ] Theme setup guide (Layout + Toggle)
- [ ] Component usage examples (2-3 per component)
- [ ] Tree-shaking import pattern documented
- [ ] Tailwind configuration requirements
- [ ] Storybook link/reference
- [ ] Clear and concise language

**References**:
- PRD.md: Version 1.0 Success Criteria (lines 363-371)
- PRD.md: Documentation Strategy (lines 194-199)
- TDD.md: Import Patterns (lines 159-172)

**Out of Scope**:
- Full API documentation (use Storybook for that)
- Migration guides (v1 is first version)
- Video tutorials

**Tips**:
- Start with a compelling hero image/example
- Show code examples that can be copy-pasted
- Mention requirements: React 19+, Tailwind CSS
- Include a "Why local-components?" section
- Link to the Storybook for interactive docs

---

## Summary

**Total Tasks**: 16

**Phase Breakdown**:
- Phase 1 (Foundation): 3 tasks (config, theme, package)
- Phase 2 (High Priority Components): 3 tasks (Button, Layout, Toggle)
- Phase 3 (Medium Priority Components): 4 tasks (Typography, Card, Section, Hero)
- Phase 4 (Exports): 1 task
- Phase 5 (Storybook): 2 tasks
- Phase 6 (Tooling & Build): 3 tasks

**Estimated Completion**:
- Phase 1: Day 1
- Phase 2: Days 2-3
- Phase 3: Days 4-6
- Phase 4: Day 7
- Phase 5: Days 8-9
- Phase 6: Day 10

**Dependencies Graph**:
```
Task 1 (Tailwind) ──────┬──────────────────────────────────┐
                       │                                  │
Task 2 (Theme) ────────┼───> Task 5 (Layout) ────────────┤
                       │           │                      │
Task 3 (Package) ────────┼───────────┼───> Task 11 (Barrels) > Task 12-16
                       │           │                      │
                       ├───> Task 4 (Button) ─────────────┤
                       │           │                      │
                       ├───> Task 6 (Toggle) ─────────────┤
                       │                                  │
                       ├───> Task 7 (Typography) ─────────┤
                       ├───> Task 8 (Card) ───────────────┤
                       ├───> Task 9 (Section) ──────────────┤
                       └───> Task 10 (Hero) ────────────────┘
```

**Critical Path**: 1 → 2 → 5 → 11 → 12 → 15

**Success Criteria (from PRD)**:
1. All 7 components implemented with React and TypeScript ✅ (Tasks 4-10)
2. Storybook documentation complete ✅ (Tasks 12-13)
3. Theme system working ✅ (Tasks 2, 5, 6)
4. oxlint and oxfmt configured ✅ (Task 14)
5. Components work on dpaez.github.io ✅ (Future deployment)
6. README with installation and usage ✅ (Task 16)
7. Design system documented ✅ (PRD + This doc)
