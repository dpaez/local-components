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

### Task 4: Build Button Component ✅ COMPLETED

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
- [x] Variants: 'primary', 'ghost', 'outline', 'disabled'
- [x] Sizes: 'default', 'sm', 'icon'
- [x] asChild prop works with Radix Slot
- [x] icon prop accepts React.ReactNode
- [x] iconPosition: 'start' | 'end' (default: 'start')
- [x] Keyboard accessible (native button behavior)
- [x] data-slot="button" attribute for debugging
- [x] Uses cn() utility for class merging
- [x] buttonVariants exported for reuse
- [x] Renders without console errors

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

### Task 5: Build Layout Component with ThemeProvider ✅ COMPLETED

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
- [x] maxWidth prop: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- [x] padding prop: 'none' | 'sm' | 'md' | 'lg'
- [x] centered prop for centering content
- [x] defaultTheme prop: 'light' | 'dark' | 'system'
- [x] storageKey prop for localStorage key
- [x] Integrates ThemeProvider internally
- [x] Applies dark class to HTML element
- [x] Responsive container using Tailwind max-w-* classes
- [x] Proper TypeScript types exported

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

### Task 6: Build Toggle (ThemeToggle) Component ✅ COMPLETED

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
- [x] Variants: 'icon' | 'button' | 'switch'
- [x] showLabel prop for text label visibility
- [x] Consumes useTheme() from lib/theme-context
- [x] Displays sun icon when resolvedTheme is 'light'
- [x] Displays moon icon when resolvedTheme is 'dark'
- [x] Calls toggleTheme() on click
- [x] Keyboard accessible (Space/Enter)
- [x] ARIA attributes: aria-label, role="switch"
- [x] Respects prefers-reduced-motion
- [x] Smooth icon transitions (CSS)

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

### Task 7: Build Typography Components ✅ COMPLETED

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
- [x] Heading: as prop for h1-h6, size prop for scale
- [x] Text: as prop for p, span, etc.
- [x] Lead: larger, emphasized text style
- [x] Blockquote: styled with left border
- [x] Code: inline monospace with background
- [x] All components support className prop
- [x] Semantic HTML by default
- [x] Responsive text sizes (text-sm, text-base, text-lg, etc.)
- [x] Dark mode text colors via dark: variants
- [x] Proper font stack (system fonts)

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

### Task 8: Build Card Component ✅ COMPLETED

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
- [x] title prop (optional)
- [x] description prop (optional)
- [x] image prop with src and alt
- [x] footer prop for React.ReactNode
- [x] href prop for link wrapping
- [x] Variants: 'default', 'bordered', 'ghost', 'elevated'
- [x] Hover states for interactive cards
- [x] asChild support with Radix Slot
- [x] Handles overflow gracefully
- [x] Dark mode border/background adjustments

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

### Task 9: Build Section Component ✅ COMPLETED

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
- [x] title prop (optional) with styling
- [x] subtitle prop (optional)
- [x] id prop for anchor links (#section-id)
- [x] background: 'default' | 'alternate' | 'primary' | 'accent'
- [x] spacing: 'compact' | 'default' | 'spaced'
- [x] Semantic section element
- [x] Consistent padding (py-12, py-16, py-24 based on spacing)
- [x] Respects theme (light/dark backgrounds)

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

### Task 10: Build Hero Component ✅ COMPLETED

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
- [x] title prop (required)
- [x] subtitle prop (optional)
- [x] cta prop: { label, href, variant }
- [x] background: { type: 'image' | 'color' | 'gradient', value }
- [x] alignment: 'left' | 'center' | 'right'
- [x] Variants: 'default', 'minimal', 'split', 'full-bleed'
- [x] Responsive text sizing (text-4xl → text-6xl)
- [x] asChild support for custom wrapper
- [x] Dark mode compatible backgrounds

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

## Phase 4: Storybook Setup & Stories

### Task 11: Setup Storybook ✅ COMPLETED

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
- [x] Storybook 10+ configured with @storybook/react-vite
- [x] @storybook/addon-themes for theme switching
- [x] @storybook/addon-essentials included
- [x] TypeScript support configured
- [x] Theme decorator applies dark/light class
- [x] All stories support theme toggle
- [x] Build works: `bunx storybook build`
- [x] Dev server works: `bunx storybook dev`

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

### Task 12: Create Storybook Stories ✅ COMPLETED

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
- Task 11 (Storybook setup)
- All component tasks (4-10)

**Acceptance Criteria**:
- [x] Default story for each component
- [x] Stories for all component variants
- [x] Controls for all props
- [x] Theme decorator applied to all stories
- [x] Dark mode story for each component
- [x] AsChild composition story (where applicable)
- [x] No console errors in any story
- [x] Responsive viewport testing enabled

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

## Phase 5: Tooling & Build

### Task 13: Configure OXC Tooling

**Overview**: Setup oxlint and oxfmt for fast Rust-based linting and formatting.

**Deliverable**:
- `oxlint.json` or `.oxlintrc.json` - Lint rules
- `oxfmt.json` - Format configuration
- Update package.json with lint/format scripts
- Documentation on usage

**Dependencies**:
- All source code tasks completed

**Acceptance Criteria**:
- [x] oxlint configured and passing
- [x] oxfmt configured with consistent style
- [x] Package.json scripts:
  - "lint": "oxlint src/"
  - "lint:fix": "oxlint src/ --fix"
  - "format": "oxfmt src/"
  - "format:check": "oxfmt --check src/"
- [x] No lint errors in src/
- [x] All files formatted consistently

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

### Task 14: Build System with Bun

**Overview**: Create the Bun build system for ESM-only library distribution with type declarations.

**Deliverable**:
- Update `build.ts` to build library components
- Type declaration generation
- Build output to `dist/` directory
- Verify tree-shaking works

**Dependencies**:
- Task 3 (Package.json exports)
- All components

**Acceptance Criteria**:
- [x] Build script outputs to `dist/`
- [x] ESM format only (`--format esm`)
- [x] Type declarations generated (`.d.ts` files)
- [x] Individual component builds tree-shakeable
- [x] Maintains directory structure: dist/components/*, dist/lib/*
- [x] Build completes in <30s
- [x] No build errors
- [x] Output files are valid JavaScript

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

### Task 15: Create README Documentation

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
- Task 11 (Storybook - mention it)

**Acceptance Criteria**:
- [x] Installation: `npm install local-components` (for future)
  - And local: clone and build
- [x] Quick start code example
- [x] Theme setup guide (Layout + Toggle)
- [x] Component usage examples (2-3 per component)
- [x] Tree-shaking import pattern documented
- [x] Tailwind configuration requirements
- [x] Storybook link/reference
- [x] Clear and concise language

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

**Total Tasks**: 15

**Phase Breakdown**:
- Phase 1 (Foundation): 3 tasks (config, theme, package)
- Phase 2 (High Priority Components): 3 tasks (Button, Layout, Toggle)
- Phase 3 (Medium Priority Components): 4 tasks (Typography, Card, Section, Hero)
- Phase 4 (Storybook): 2 tasks
- Phase 5 (Tooling & Build): 3 tasks
- Phase 6 (Improve Stories): 

**Dependencies Graph**:
```
Task 1 (Tailwind) ──────┬──────────────────────────────────┐
                       │                                  │
Task 2 (Theme) ────────┼───> Task 5 (Layout) ────────────┤
                       │           │                      │
Task 3 (Package) ────────┼───────────┼───> Task 12-15
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

**Critical Path**: 1 → 2 → 5 → 12 → 15

**Success Criteria (from PRD)**:
1. All 7 components implemented with React and TypeScript ✅ (Tasks 4-10)
2. Storybook documentation complete ✅ (Tasks 11-12)
3. Theme system working ✅ (Tasks 2, 5, 6)
4. oxlint and oxfmt configured (Task 13)
5. Components work on dpaez.github.io (Future deployment)
6. README with installation and usage ✅ (Task 15)
7. Design system documented ✅ (PRD + This doc)

---

## Phase 6: Improve Components

### Task 16: Components and Stories Fixes

**Overview**: Update and fix stories. The goal is to make them more clean and direct. Some stories are not working or not needed (not a valid use case). 

**Deliverable**: Updated stories and component API when needed. Update related documents too (README.md, and docs/)

**Dependencies**: 
- All component tasks completed
- Task 11 (Storybook - mention it)

**Acceptance Criteria**:
- [x] Button Fixes ✅
  - [x] Story sizes. Button uses medium as default. Added "Sizes" story showcasing sm, medium, lg ✅
  - [x] Add support for a `secondary` button option. Primary is still the default ✅
  - [x] Create a new variant CTA button with animated gradient border ✅
- [x] Card Fixes ✅
  - [x] Extend from shadcn card (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) ✅
- [x] Hero Fixes ✅
  - [x] Left and Right aligned stories now vertically centered with proper alignment ✅
  - [x] Mobile alignment fixed with responsive flex centering ✅
  - [x] Hero component height is now min-h-screen ✅
  - [x] With Background Color story uses theme color with proper text contrast ✅
  - [x] Split story now shows gradient placeholder when no image, with proper explanation ✅
  - [x] Improved stories with design skills (picsum.photos for reliable images, consistent naming, no generic content) ✅
- [x] Toggle Fixes ✅
  - [x] Switch variant should use shadcn switch ✅
  - [x] icon should be parametrizable (allows 2 options -- boolean) ✅

**Out of Scope**:
- Full API documentation (use Storybook for that)
- Migration guides (v1 is first version)
- Video tutorials

**Tips**:
- Use `argTypes` to control prop values in UI
- Create variants as separate stories for easy comparison
- Include a "Kitchen Sink" story showing all features
- Test edge cases: long text, empty props, etc.
- Use globals to force theme: `globals: { theme: 'dark' }`

---

### Task 17: Create Badge Component

**Overview**: Add a new Badge component to display tags, labels, or categorized content. The Badge extends from shadcn/ui Badge foundation and adds local customization for personal site use cases.

**Deliverable**:
- `src/components/badge/index.ts` - Component barrel export
- `src/components/badge/badge.tsx` - Badge implementation extending shadcn/ui Badge
- `src/components/badge/badge.stories.tsx` - Storybook stories
- Badge stories showcasing:
  - Default variant
  - Secondary variant
  - Outline variant
  - Destructive variant
  - With icon (optional)
  - Dismissible with close button

**Dependencies**:
- Task 1 (Tailwind config with design tokens)
- Task 11 (Storybook setup)
- shadcn/ui Badge installation

**Acceptance Criteria**:
- [x] Install shadcn/ui Badge component via CLI ✅
- [x] Extend Badge with local styling (colors, typography) ✅
- [x] Support 4 variants: default, secondary, outline, destructive ✅
- [x] Support optional icon (left side) ✅
- [x] Support dismissible variant with close button (aria-label) ✅
- [x] Proper TypeScript types exported ✅
- [x] Storybook stories with all variants ✅
- [x] Keyboard accessible (dismissible variant) ✅
- [x] Follow design-taste-frontend skill (no emojis, proper typography) ✅

**Out of Scope**:
- Complex badge groups or layouts
- Badge animations beyond CSS transitions
- Badge selection state (use Toggle instead)

**Tips**:
- Install: `npx shadcn@latest add badge`
- Use CVA for variant management
- For dismissible: use Radix UI Dialog primitive or custom implementation
- Apply design skills: consistent spacing, proper color contrast
- Test in both light and dark modes

---

### Task 18: shadcn/ui Integration and Switch Implementation

**Overview**: Integrate shadcn/ui components as the foundation layer, starting with installing the Switch component for the Toggle's switch variant. Set up the pattern for extending shadcn components.

**Deliverable**:
- shadcn/ui CLI initialized (`npx shadcn@latest init` if needed)
- `src/components/ui/switch.tsx` - shadcn Switch component installed
- `src/components/toggle/toggle.tsx` - Updated to use shadcn Switch for switch variant
- Updated Toggle stories showing all 3 variants:
  - icon (current)
  - button (current)
  - switch (new, using shadcn Switch)

**Dependencies**:
- Task 1 (Tailwind config)
- Task 2 (Theme context)
- Task 6 (Toggle component base)

**Acceptance Criteria**:
- [x] shadcn/ui CLI configured for the project ✅
- [x] Switch component installed via shadcn CLI ✅
- [x] Toggle switch variant uses shadcn Switch internally ✅
- [x] Toggle switch respects theme (light/dark) ✅
- [x] Toggle switch is keyboard accessible (Space/Enter) ✅
- [x] Toggle switch respects prefers-reduced-motion ✅
- [x] Storybook shows all 3 toggle variants (icon, button, switch) ✅
- [x] CSS variables properly integrated with shadcn ✅

**Out of Scope**:
- Other shadcn components (install as needed)
- Full shadcn/ui theme migration
- shadcn registry components

**Tips**:
- Run: `npx shadcn@latest init` to set up shadcn
- Run: `npx shadcn@latest add switch`
- shadcn components go in `src/components/ui/`
- Extend locally in `src/components/` (e.g., Toggle wraps Switch)
- See TDD.md: "Extend from shadcn/ui first" philosophy
- Reference: https://ui.spectrumhq.in/blog/shadcn-customization-guide

---

## Updated Summary

**Total Tasks**: 18

**Phase Breakdown**:
- Phase 1 (Foundation): 3 tasks (config, theme, package)
- Phase 2 (High Priority Components): 3 tasks (Button, Layout, Toggle)
- Phase 3 (Medium Priority Components): 4 tasks (Typography, Card, Section, Hero)
- Phase 4 (Storybook): 2 tasks
- Phase 5 (Tooling & Build): 3 tasks
- Phase 6 (Improve Components): 3 tasks (16, 17, 18)

**Dependencies Graph**:
```
Task 1 (Tailwind) ──────┬──────────────────────────────────┐
                        │                                  │
Task 2 (Theme) ────────┼───> Task 5 (Layout) ────────────┤
                        │           │                      │
Task 3 (Package) ────────┼───────────┼───> Task 12-15
                        │           │                      │
                        ├───> Task 4 (Button) ─────────────┤
                        │           │                      │
                        ├───> Task 6 (Toggle) ─────────────┤
                        │           │                      │
                        ├───> Task 18 (shadcn Switch) ─────┘
                        │                                  │
                        ├───> Task 7 (Typography) ─────────┤
                        ├───> Task 8 (Card) ───────────────┤
                        ├───> Task 9 (Section) ──────────────┤
                        ├───> Task 10 (Hero) ────────────────┤
                        └───> Task 17 (Badge) ─────────────┘
```

**New Critical Paths**:
- Badge: 1 → 2 → 17
- shadcn Switch: 1 → 2 → 6 → 18
- Component Fixes: All previous → 16


---

## Phase 7: Portfolio Page Story

### Task 19: Portfolio Data Document

**Overview**: Fetch and structure professional data from dpaez.github.io into a reusable markdown document stored alongside the portfolio stories that consume it.

**Deliverable**:
- `src/portfolio/portfolio-data.md` containing structured data:
  - Personal info (Diego "DEKA" Paez, Tierra del Fuego, Patagonia, Argentina, UNLP)
  - Professional experience (GEUT co-founder '18, SHER product Q4 2020, Despegar, LIFIA, UNLP professor)
  - Technical skills (JavaScript, Node.js, P2P, Distributed Systems, React, HCI)
  - Talks & workshops (NodeConf Colombia 2019 "Building Up on Dat", Argentina 2018 dat-workshop, Argentina 2016 "Micro (hapi) ness", Node Interactive NA 2016 "Multimodal Interactions & JS")
  - Contact information (diego at geutstudio . com)
  - Links (GitHub: dpaez, Twitter: carax, GEUT, SHER)
  - Areas of interest (JavaScript, Node.js, Distributed Systems, P2P, HCI, React, Fullstack)

**Acceptance Criteria**:
- [x] Data fetched from dpaez.github.io ✅
- [x] Structured markdown at `src/portfolio/portfolio-data.md` ✅
- [x] Data is reusable for all 3 portfolio variations ✅
- [x] All sections from the site included ✅
- [x] Ready for component mapping ✅
- [x] Placeholder images referenced (picsum.photos with descriptive seeds) ✅

**Dependencies**: None (can start immediately)

**Out of Scope**:
- Actual image downloads (use placeholders)
- Dynamic data fetching (static document only)
- Multiple data formats (markdown only)

**Tips**:
- Use descriptive seeds for picsum.photos (e.g., `seed=deka-nodeconf`, `seed=geut-logo`)
- Structure with clear headers for easy parsing
- Include all professional highlights
- Keep formatting clean for easy data extraction

---

### Task 20: Portfolio Variation 1 - "Minimalist Engineer"

**Overview**: Create the first portfolio page variation as a Storybook story with a clean, DASEIN-inspired aesthetic featuring strong typography and section-based layout.

**Design Approach**:
- **Inspiration**: DASEIN (roicort.github.io/dasein)
- **Skills Applied**: normalize, polish
- **Aesthetic**: Ultra-clean, generous whitespace, typographic hierarchy
- **Layout**: Single-column with anchored sections
- **Colors**: Primarily monochromatic with strategic primary accent usage
- **Animation Level**: 1-3 (static with CSS hover states)
- **Components Used**: Hero, Section, Typography (Heading, Text), Card, Button, Toggle

**Features**:
- Full-bleed hero with subtle gradient background
- Sticky navigation with section anchor links
- Timeline-style experience section
- Skills displayed as minimal text tags
- Clean contact section with social links
- Theme toggle integration

**Deliverable**:
- `src/portfolio/minimalist.stories.tsx` - Storybook story
- Uses data from `src/portfolio/portfolio-data.md`
- Placeholder images via picsum.photos

**Acceptance Criteria**:
- [x] Storybook story renders correctly ✅
- [x] Single page layout with anchored sections ✅
- [x] Responsive design (mobile-first) ✅
- [x] Uses components from local-components ✅
- [x] Respects globals.css theme variables ✅
- [x] Theme toggle works (light/dark) ✅
- [x] DASEIN-inspired clean aesthetic (normalize skill) ✅
- [x] Polish skill applied (consistent spacing, refined details) ✅
- [x] No emojis (design-taste-frontend compliance) ✅
- [x] Geist or Satoshi typography ✅

**Dependencies**:
- Task 19 (Portfolio data)
- All Phase 1-6 components

**Out of Scope**:
- Next.js pages (Storybook only)
- Complex animations
- External data fetching
- Custom fonts (use system fallbacks)

**Tips**:
- Use `normalize` skill for consistent spacing and typography
- Apply `polish` skill for refined details
- Use `min-h-[100dvh]` not `h-screen` for hero
- Test both light and dark themes
- Keep layout predictable (design variance 1-3)

---

## Updated Summary

**Total Tasks**: 20

**Phase Breakdown**:
- Phase 1 (Foundation): 3 tasks (config, theme, package) ✅
- Phase 2 (High Priority Components): 3 tasks (Button, Layout, Toggle) ✅
- Phase 3 (Medium Priority Components): 4 tasks (Typography, Card, Section, Hero) ✅
- Phase 4 (Storybook): 2 tasks ✅
- Phase 5 (Tooling & Build): 3 tasks ✅
- Phase 6 (Improve Components): 3 tasks (16, 17, 18) ✅
- **Phase 7 (Portfolio Variations): 2 tasks (19, 20)**

**New Files to Create**:
1. `src/portfolio/portfolio-data.md` (shared data)
2. `src/portfolio/minimalist.stories.tsx`

**Skills Applied by Variation**:
- Minimalist Engineer: normalize, polish

**Dependencies Graph**:
```
Task 19 (Portfolio Data)
        │
        └───> Task 20 (Minimalist Engineer)

Task 1-18 (All Previous Components)
        │
        └───> Task 20 (Portfolio Story)
```

**Critical Paths**:
- Portfolio Story: 1 → 2 → 19 → 20

