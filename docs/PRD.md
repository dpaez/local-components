# Product Requirements Document - local-components

## Problem Statement

Developers building or updating personal sites face several challenges:
1. **Lack of cohesive component libraries** - Most component libraries are designed for enterprise applications (heavy, complex) or are too generic (don't fit personal branding needs).
2. **Poor documentation and discoverability** - When components exist, they often lack proper documentation, making it difficult to understand usage patterns and customization options.
3. **No visual testing environment** - Developers need to see components in action, test edge cases, and ensure they work across different scenarios before integrating them into their sites.
4. **Inconsistency in design** - Without a structured component library, personal sites often suffer from visual inconsistency and repetitive styling work.
5. **No built-in theming support** - Implementing dark/light mode requires significant boilerplate code, and maintaining theme consistency across components is error-prone.

The current landscape forces developers to either build everything from scratch or adapt enterprise-focused libraries that don't align with personal site aesthetics.

## Solution

**local-components** is a curated React component library designed specifically for personal sites and portfolio pages. It provides:

1. **Seven foundational components** (Hero, Layout, Section, Typography, Card, Toggle, Button) that cover the essential building blocks of modern personal sites
2. **Interactive Storybook integration** for component exploration, testing, and documentation
3. **Built-in theme switching** with dark/light mode support, automatic OS preference detection, and localStorage persistence
4. **Built on proven technologies** (React, TypeScript, shadcn/ui, Tailwind CSS) for reliability and ease of use
5. **Type-safe APIs** with full TypeScript support
6. **Tailwind-first styling** for easy customization and theming
7. **Proper documentation** for each component with usage examples and prop references

The library serves as both a ready-to-use package and a reference implementation for the GEUT team's component patterns.

## User Stories

1. As a developer building my personal site, I want a pre-built Hero component, so that I can create an engaging landing section without designing from scratch.

2. As a developer, I want a flexible Layout component, so that I can structure my pages consistently across different screen sizes.

3. As a developer, I want a Section component, so that I can organize content into logical, styled blocks with consistent spacing.

4. As a developer, I want Typography components, so that I can maintain consistent text styling throughout my site.

5. As a developer, I want a Card component, so that I can display content snippets (projects, blog posts, skills) in a visually appealing way.

6. As a developer, I want a ThemeToggle component, so that I can allow users to switch between light and dark themes on my site.

7. As a developer, I want my site to automatically detect and respect the user's OS theme preference, so that visitors get their preferred theme without manual configuration.

8. As a developer, I want theme preferences to persist across sessions using localStorage, so that returning visitors see their chosen theme immediately.

9. As a developer, I want to see components in Storybook before using them, so that I can understand how they look and behave with different props.

10. As a developer, I want TypeScript support, so that I get autocomplete and type checking when using components.

11. As a developer, I want components built on shadcn/ui patterns, so that they integrate well with the broader ecosystem.

12. As a consultant updating a client's flagship site, I want well-tested components, so that I can deliver reliable, professional results quickly.

13. As a member of the GEUT team, I want a shared component library, so that we can maintain consistency across our projects.

14. As a developer, I want clear documentation for each component, so that I don't need to read source code to understand usage.

15. As a developer, I want components with Tailwind CSS classes, so that I can easily override styles to match my brand.

16. As a developer, I want to manually test component variations in Storybook, so that I can verify they handle different content lengths and edge cases.

17. As a developer, I want the library to be linted with oxlint, so that the code follows consistent patterns and catches common issues.

18. As a developer, I want formatted code with oxfmt, so that the codebase is readable and maintainable.

19. As a user of the library, I want the components to be accessible by default, so that my site works for everyone including users with disabilities.

20. As a developer, I want responsive components out of the box, so that my site looks good on mobile, tablet, and desktop.

21. As a developer, I want minimal dependencies, so that my bundle size stays small and the library is easy to maintain.

22. As a developer exploring the library, I want a live Storybook deployment, so that I can preview components without installing anything.

23. As a developer using the library, I want semantic versioning and clear changelogs, so that I can safely upgrade without breaking my site.

## Implementation Decisions

### Component Architecture

**Deep Module: Component Foundation**
- A base component module that provides shared utilities (class merging, prop validation, theme context)
- This module will be used by all specific components (Hero, Layout, Section, Typography, Card, Toggle, Button)
- Interface: Type-safe props with sensible defaults, consistent naming conventions

**Component Hierarchy**
```
Base Utils (class variance authority, tailwind-merge, clsx, theme context)
    ├── Layout (page structure + ThemeProvider)
    │   ├── Section (content blocks)
    │   ├── Button (action)
    │   └── Toggle (theme control)
    ├── Hero (landing section)
    ├── Typography (text hierarchy)
    └── Card (content containers)
```

### Technology Stack

1. **React 19+** - Component library foundation
2. **TypeScript** - Type safety and developer experience
3. **Tailwind CSS** - Utility-first styling with `darkMode: 'class'` strategy
4. **shadcn/ui patterns** - Composable component architecture using Radix UI primitives where applicable
5. **class-variance-authority** - Type-safe Tailwind class composition
6. **tailwind-merge + clsx** - Efficient class name handling
7. **Storybook 10+** - Component documentation and testing environment
8. **oxlint** - Fast linting
9. **oxfmt** - Code formatting

### Theme System Architecture

**Deep Module: Theme Management**
- A theme context module that provides:
  - Theme state management (light | dark | system)
  - localStorage persistence with configurable storage key
  - OS preference detection via `prefers-color-scheme: dark` media query
  - HTML `dark` class injection for Tailwind dark mode
  - Default theme configuration (defaults to 'light')
- This module is consumed by Layout (provides context) and ThemeToggle (consumes context)
- Interface: Simple context provider + useTheme hook

**Theme System Flow**
```
Layout Component (ThemeProvider)
    ├── Reads initial theme (localStorage > OS preference > default)
    ├── Watches for OS preference changes
    ├── Applies 'dark' class to html element
    ├── Persists theme changes to localStorage
    └── Provides theme context to children
        └── ThemeToggle Component
            ├── Consumes theme context
            ├── Renders sun/moon icons based on current theme
            └── Triggers theme toggle on click
```

### Component Specifications

#### Hero Component
- **Purpose**: Eye-catching landing section for personal sites
- **Props**: title, subtitle, cta (call-to-action), background (image/color/gradient), alignment
- **Variants**: Default, Minimal, Split (image + text), Full-bleed
- **Features**: Responsive text sizing, optional background media, CTA button support, dark mode compatible

#### Layout Component
- **Purpose**: Page-level structure, responsive grid system, AND theme management
- **Props**: children, maxWidth, padding, centered, defaultTheme, storageKey
- **Variants**: Default, Wide, Narrow, Full-bleed
- **Features**: 
  - Container queries support, consistent spacing, centered content option
  - Built-in ThemeProvider with React Context
  - Automatic OS preference detection (prefers-color-scheme)
  - localStorage persistence with configurable key (default: 'local-components-theme')
  - `dark` class injection on html element for Tailwind dark mode
  - Default theme: 'light' (configurable via defaultTheme prop)

#### Section Component
- **Purpose**: Logical content grouping with consistent styling
- **Props**: children, title, subtitle, id (for anchor links), background, spacing
- **Variants**: Default, Alternate (different background), Compact, Spaced
- **Features**: Optional heading with styling, anchor link support, flexible background options, respects theme (light/dark backgrounds)

#### Typography Component
- **Purpose**: Consistent text hierarchy and styling
- **Components**: Heading (h1-h6), Text (p, span), Lead (emphasized paragraph), Blockquote, Code
- **Props**: as (polymorphic), size, weight, color, align
- **Features**: Semantic HTML by default, size override options, responsive text sizes, automatic color adjustment for dark mode via Tailwind `dark:text-*` classes

#### Card Component
- **Purpose**: Content containers for projects, posts, skills, etc.
- **Props**: title, description, image, footer, href (clickable), variant
- **Variants**: Default, Bordered, Ghost, Elevated
- **Features**: Optional image support, footer slot for actions/metadata, hover states, link wrapping, automatic border/background adjustments for dark mode

#### ThemeToggle Component
- **Purpose**: UI control for switching between light and dark themes
- **Props**: variant ('icon' | 'button' | 'switch'), className, showLabel
- **Variants**: Icon (sun/moon icon only), Button (icon + label), Switch (toggle switch style)
- **Features**: 
  - Accessible button with aria-label and role="switch"
  - Sun/Moon icon toggle with smooth transitions
  - Respects `prefers-reduced-motion` for accessibility
  - Works with Layout's ThemeProvider via useTheme hook
  - Optional text label for better UX
  - Keyboard accessible (Space/Enter to toggle)

#### Button Component
- **Purpose**: UI control for triggering actions
- **Props**: variant ('primary' | 'ghost' | 'outline' | 'disabled'), className, showLabel
- **Variants**: Icon (custom svg icon)
- **Features**:
  - Accessible button with aria-label and role='button'
  - Accepts icon, can be icon button only, icon position can be tweaked (start = default, end = optional)
  - Keyboard accessible (space/enter to toggle)

### Documentation Strategy

- **Storybook Stories**: Each component has a Default story + all variants
- **Storybook Theming**: All stories include a theme toggle decorator for testing light/dark modes
- **MDX Documentation**: Component API reference, usage examples, design tokens, theme usage guide
- **README**: Quick start, installation, basic usage patterns, theme configuration guide

### Build and Distribution

- **Package Manager**: pnpm (for workspace/monorepo support)
- **Build Tool**: tsup or Rollup for library bundling
- **Output**: ESM and CJS formats, type declarations
- **CSS**: Tailwind CSS included, customizable via CSS variables and Tailwind theme config
- **Tailwind Config**: Requires `darkMode: 'class'` in consumer's tailwind.config.js

## Design System

### Design Philosophy

**Minimalistic approach** - Clean, uncluttered designs that let content breathe
**Black and White foundation** - Neutral base that works in both light and dark modes
**Strategic color accents** - Limited use of primary and accent colors for emphasis

### Design Inspiration

The following projects serve as reference for layout structure and minimalistic aesthetics:

1. **DASEIN** (https://roicort.github.io/dasein/)
   - Clean, minimal layout structure
   - Strong typography hierarchy
   - Section-based content organization
   - Inspiration for Layout and Section components

2. **SARAL** (https://yashjawale.in/saral-theme-astro/)
   - Another similar minimal layout approach
   - Card-based content presentation
   - Typography treatment
   - Inspiration for Card and Typography components

### Color Palette

**Base Colors (Black & White)**
- **Light Mode**: White backgrounds (#efefef) with black text (#121212)
- **Dark Mode**: Black backgrounds (#121212) with white text (#efefef)
- **Gray Scale**: Used for borders, secondary text, and subtle backgrounds

**Accent Colors**
- **Primary**: `oklch(0.5007 0.2524 272.54)` - Deep blue/purple tone
  - Used for: primary buttons, links, key interactive elements, section accents
  - Tailwind mapping: `primary` color in theme config
  
- **Accent**: `oklch(0.7134 0.1799 47.45)` - Warm orange/coral tone
  - Used for: highlights, call-to-action elements, hover states, decorative accents
  - Tailwind mapping: `accent` color in theme config

### Typography

**Font Stack**: System fonts for performance (Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto)

**Type Scale**:
- **Display/Headings**: Bold weights (700-900), tight line-height
- **Body**: Regular weight (400), comfortable line-height (1.6-1.8)
- **Small/Caption**: Light weight (300-400), generous line-height

### Spacing System

**Consistent spacing scale** using Tailwind defaults:
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 2rem (32px)
- xl: 4rem (64px)
- 2xl: 8rem (128px)

### Component Design Patterns

**Borders**: Minimal use - only when needed for separation (1px solid gray-200/gray-800)
**Shadows**: Subtle, only for elevated elements (cards on hover)
**Radius**: Sharp corners (0-4px) for professional/minimal look, or fully rounded for buttons
**Transitions**: Smooth but quick (150-300ms) for theme changes and hover states

## Testing Decisions

### Testing Philosophy

Tests should focus on **external behavior** - what users see and interact with, not internal implementation details. We test components as black boxes.

Good tests verify:
- Components render without errors
- Props are correctly applied
- User interactions work as expected
- Accessibility attributes are present
- Visual states match design specs
- Theme switching works correctly (light → dark → light)
- Color contrast meets WCAG standards (especially for primary/accent colors)

### Testing Strategy

**Phase 1: Manual Testing via Storybook**
- Each component variant has a dedicated Storybook story
- All stories include theme toggle for visual testing in both light and dark modes
- Developers manually test edge cases (long text, empty props, different viewports, theme transitions)
- Visual regression testing via Storybook's built-in viewport tools
- Interaction testing via Storybook's play functions
- Theme testing via Storybook's toolbar toggle (dark/light)
- Color contrast verification using browser dev tools

**Phase 2: Automated Testing (Future)**
- Component unit tests using React Testing Library
- Focus on accessibility and interaction testing
- Snapshot testing for CSS class generation
- Theme context testing (persistence, OS preference detection)
- E2E testing for Storybook navigation and component rendering

### Test Coverage Priority

**High Priority (Manual + Future Automation)**
1. Hero - Critical landing component, multiple visual states, background adaptability
2. Card - Common interaction patterns, hover states, links, border/background in dark mode
3. ThemeToggle - Core functionality, accessibility, icon transitions

**Medium Priority (Manual)**
4. Layout - Responsive behavior, container queries, theme provider integration
5. Typography - Semantic HTML, responsive sizing, dark mode text colors
6. Section - Background variations, spacing consistency, theme-aware styling

### What Constitutes a Good Test

- Tests verify user-visible outcomes, not implementation
- Tests are resilient to refactoring (don't test class names or internal state)
- Tests document expected behavior for future developers
- Accessibility tests verify ARIA attributes and keyboard navigation
- Theme tests verify visual appearance in both light and dark modes
- Color tests verify primary/accent colors render correctly and meet contrast requirements

## Out of Scope

The following are explicitly excluded from the initial version:

1. **E2E Testing Infrastructure** - Will be explored in future iterations; initial release relies on Storybook manual testing
2. **Animation Library** - No Framer Motion or similar; components are static for v1 (except ThemeToggle icon transitions)
3. **Form Components** - Inputs, buttons, selects will come in a later release
4. **npm Package Publishing** - v1 will be source-available for reference; publishing workflow comes later
5. **Automated CI/CD** - Storybook deployment and package publishing workflows are future work
6. **Design Tokens System** - Full design system with tokens is out of scope; components use direct Tailwind classes with `dark:` variants (though color palette is documented)
7. **Figma Integration** - No design-to-code automation or Figma plugin
8. **Component Generator CLI** - No scaffolding tools for creating new components
9. **Browser Extension** - No companion browser tools
10. **Multiple Custom Themes** - Only light/dark mode supported initially, no custom color themes (beyond primary/accent colors)
11. **System Theme Sync** - While we detect initial OS preference, we don't auto-switch when OS changes while the site is open

## Further Notes

### Target Audience Clarification

While the primary audience is developers building personal sites, the library is designed to be useful for:
- Personal portfolio sites (dpaez.github.io and similar)
- Small consultancy flagship sites
- GEUT team internal projects

### shadcn/ui Integration

Components follow shadcn/ui patterns but are custom implementations:
- Use Radix UI primitives where applicable (accessibility)
- Copy-paste friendly architecture
- Customizable via Tailwind (not CSS-in-JS)
- No runtime CSS-in-JS dependencies
- Theme system is self-contained within the library

### Version 1.0 Success Criteria

1. All 7 components implemented with React and TypeScript (Hero, Layout, Section, Typography, Card, Toggle, Button)
2. Storybook documentation complete with stories for all variants in both light and dark modes
3. Theme system working: OS detection, localStorage persistence, light/dark toggle
4. oxlint and oxfmt configured and passing
5. Components work on dpaez.github.io as proof of concept
6. README with installation, usage, and theme configuration instructions
7. Design system documented with exact color values and inspiration references

### Future Considerations

- CSS Variables-based theming system for more customization
- Additional components: Navigation, Footer, Gallery, Timeline
- npm package distribution
- Automated Storybook deployment to GitHub Pages
- Theme synchronization with OS preference changes while site is open
- Multiple custom color themes beyond light/dark
- Theme transition animations
