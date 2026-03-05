# Technical Design Document - local-components

## Overview

This document describes the technical implementation of **local-components**, a React component library designed for personal sites and portfolio pages. The library provides seven foundational components (Hero, Layout, Section, Typography, Card, Toggle, Button) with built-in theme switching support, minimal dependencies, and tree-shakeable exports.

The design focuses on:
- Developer experience through TypeScript-first APIs
- Bundle efficiency via individual component imports and ESM-only output
- Maintainability through minimal dependencies and standard React patterns
- Accessibility through semantic HTML and ARIA attributes
- Composition flexibility via the `asChild` pattern

## Goals

### Technical Goals

1. **Tree-shakeable Architecture** - Individual component exports to minimize bundle size for consumers who only need specific components
2. **TypeScript-First** - Full type safety with autocomplete and compile-time checking, no `any` types in public APIs
3. **Zero Runtime CSS** - No CSS-in-JS runtime dependencies (styled-components, emotion), use Tailwind classes only
4. **Minimal Dependencies** - Only peer dependencies (React 19+, React DOM), all other dependencies are devDependencies
5. **ESM-Native** - ESM-only output, no CommonJS dual package complexity
6. **Framework-Agnostic Styling** - Tailwind CSS v4 with CSS-first configuration that works with any React framework (Next.js, Astro, Vite, etc.)
7. **Accessibility-First** - All components meet WCAG 2.1 AA standards out of the box
8. **Composition-Friendly** - Support `asChild` pattern via Radix Slot for flexible component composition

### Non-Functional Goals

1. **Build Size** - Each component tree-shakes to <5KB (gzipped) including dependencies
2. **Performance** - No runtime JavaScript calculations for styling, all CSS via Tailwind
3. **Compatibility** - React 19+, no legacy React features (class components, deprecated APIs)
4. **Maintainability** - Single source of truth for shared utilities, consistent component patterns

## Background/Context

### Design Philosophy

The library extends **shadcn/ui** as its foundational layer, then builds custom components on top:

**Foundation Layer (shadcn/ui)**:
- Use shadcn/ui CLI to install base components (`npx shadcn@latest add [component]`)
- Inherit Radix UI primitives for accessibility and keyboard navigation  
- Maintain full customization via CSS variables and Tailwind classes
- Follow shadcn/ui patterns but provide npm-installable convenience

**Extension Layer (local-components)**:
- Build domain-specific components on top of shadcn/ui (Hero, Section, Layout patterns)
- Apply premium design patterns using our design-taste-frontend skill (no AI purple, proper typography)
- Implement advanced interactions (liquid glass, magnetic effects, micro-animations)
- Enforce brand consistency across all components

**Key Approach**:
- Extend shadcn/ui first (see [customization guide](https://ui.spectrumhq.in/blog/shadcn-customization-guide))
- Add local variations for personal site use cases
- Apply design skills for premium UI/UX
- Support `asChild` pattern for flexible composition

**Design Skills Applied**:
- design-taste-frontend: Premium UI patterns, anti-slop enforcement
- shadcn-ui: Component integration best practices
- impeccable: Code quality and polish

### Prior Art

**Reference Projects**:
- **DASEIN** (https://roicort.github.io/dasein/): Layout structure inspiration
- **SARAL** (https://yashjawale.in/saral-theme-astro/): Typography and Card patterns

Both projects demonstrate minimalistic aesthetics with off-black/off-white foundations and strategic color accents.

### Constraints

1. **Bundle Size Budget**: Keep each component <5KB gzipped
2. **Dependency Budget**: Zero runtime dependencies beyond React
3. **Peer Dependencies**: React 19+, React DOM 19+
4. **Browser Support**: Modern browsers (ES2020+), no IE11 support

## Requirements

### Functional Requirements

1. **Components must render without errors** in React 19+ strict mode
2. **Components must be tree-shakeable** when imported individually
3. **Components must support dark/light themes** via Tailwind's `darkMode: 'class'` strategy
4. **Theme state must persist** to localStorage across sessions
5. **Components must respect OS theme preference** on initial load
6. **Components must be keyboard navigable** (WCAG 2.1 AA)
7. **Components must work with SSR** (Next.js App Router compatibility)
8. **Type definitions must be exported** for TypeScript consumers
9. **Components must support composition** via `asChild` prop with Radix Slot

### Non-Functional Requirements

1. **Build output must be ESM-only** (no CJS)
2. **Type declarations must be generated** for all exports
3. **CSS must be configured CSS-first** using Tailwind v4 `@import` syntax
4. **Storybook must document all variants** in both light and dark modes
5. **oxlint must pass** without errors
6. **oxfmt must format** all source files

### Component-Specific Requirements

#### Layout
- Must provide ThemeProvider context to children
- Must inject `dark` class on HTML element
- Must read/write localStorage with configurable key
- Must detect `prefers-color-scheme: dark` media query

#### Toggle (ThemeToggle)
- Must consume Layout's ThemeContext
- Must render sun icon in light mode, moon icon in dark mode
- Must be keyboard accessible (Space/Enter to toggle)
- Must respect `prefers-reduced-motion`
- **Switch variant must use shadcn/ui Switch component** for proper accessibility and behavior

#### Hero
- Must support background image, color, or gradient
- Must have responsive text sizing
- Must support optional CTA button
- Must support `asChild` for custom wrapper elements

#### Card
- Must support hover states
- Must support link wrapping (if href provided)
- Must handle overflow gracefully (long text, large images)
- Must support `asChild` for custom container elements

#### Button
- Must support multiple variants (primary, ghost, outline, disabled)
- Must support icon-only mode
- Must support icon positioning (start/end)
- Must be keyboard accessible (Space/Enter to activate)
- Must support `asChild` to render as link or other element

#### Typography
- Must render semantic HTML (h1-h6, p, span)
- Must support polymorphic `as` prop
- Must have responsive size variants

#### Badge
- Must display as inline tag/label element
- Must support multiple variants (default, secondary, outline, destructive)
- Must support optional icon or dismissible button
- Must be accessible (proper aria-label for dismissible variant)
- Must use shadcn/ui Badge as foundation

#### Section
- Must support anchor links (id prop)
- Must have consistent spacing
- Must support alternate backgrounds

## High-Level Design/Architecture

### Module Architecture

```
local-components/
├── src/
│   ├── index.ts              # Barrel export (for convenience)
│   ├── components/
│   │   ├── hero/
│   │   │   ├── index.ts      # Hero component + types
│   │   │   └── hero.tsx      # Implementation
│   │   ├── layout/
│   │   ├── section/
│   │   ├── typography/
│   │   ├── card/
│   │   ├── toggle/
│   │   └── button/
│   ├── lib/
│   │   ├── utils.ts          # cn() utility (tailwind-merge + clsx)
│   │   └── theme-context.tsx # ThemeProvider + useTheme hook
│   └── styles/
│       └── globals.css       # Tailwind v4 CSS-first config
└── dist/                     # Build output (ESM + types)
    ├── components/
    │   ├── hero/
    │   │   ├── index.js
    │   │   └── index.d.ts
    │   └── ...
    ├── lib/
    │   └── ...
    └── index.js              # Barrel export
```

### Import Patterns

**Individual Component (Tree-shaking)**:
```typescript
import { Hero } from 'local-components/components/hero';
import { Layout } from 'local-components/components/layout';
import { Button } from 'local-components/components/button';
import { useTheme } from 'local-components/lib/theme-context';
```

**Convenience Barrel (Not tree-shakable)**:
```typescript
import { Hero, Layout, Card, Button } from 'local-components';
```

### Component Architecture

Each component follows this internal structure with `asChild` support:

```typescript
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Component with variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ 
  className, 
  variant, 
  size, 
  asChild = false,
  ...props 
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Theme System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Layout Component                          │
│                    (ThemeProvider)                           │
├─────────────────────────────────────────────────────────────┤
│  1. Initialize theme:                                          │
│     - Check localStorage (key: 'local-components-theme')     │
│     - If not set, check prefers-color-scheme                  │
│     - Default to 'light'                                     │
│                                                                │
│  2. Apply theme:                                              │
│     - Add/remove 'dark' class on document.documentElement    │
│     - Use MutationObserver to sync across tabs               │
│                                                                │
│  3. Persist theme:                                            │
│     - Save to localStorage on change                         │
│     - Notify all consumers via React Context                 │
│                                                                │
│  Context Provider                                             │
│      │                                                        │
│      ▼                                                        │
│  ┌──────────────────────────────────────┐                   │
│  │        Child Components               │                   │
│  │  ┌────────────────────────────────┐   │                   │
│  │  │      Toggle (ThemeToggle)      │   │                   │
│  │  │  - Reads: useTheme()           │   │                   │
│  │  │  - Action: toggleTheme()       │   │                   │
│  │  └────────────────────────────────┘   │                   │
│  │  ┌────────────────────────────────┐   │                   │
│  │  │      Any Other Component        │   │                   │
│  │  │  - Can read current theme      │   │                   │
│  │  │  - Can react to theme changes  │   │                   │
│  │  └────────────────────────────────┘   │                   │
│  └──────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Theme State Machine

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    Init     │────▶│  Check       │────▶│  localStorage│
│             │     │  Storage     │     │   exists?    │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                          Yes                   │ No
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐      ┌──────────────┐
                    │  Use stored  │      │  Check OS    │
                    │  theme       │      │  preference  │
                    └──────────────┘      └──────┬───────┘
                                                 │
                               ┌─────────────────┼─────────────────┐
                               │                 │                 │
                               ▼                 ▼                 ▼
                         ┌──────────┐     ┌──────────┐     ┌──────────┐
                         │ prefers  │     │ prefers │     │ no       │
                         │ dark     │     │ light   │     │ preference│
                         └────┬─────┘     └────┬────┘     └─────┬────┘
                              │                │               │
                              ▼                ▼               ▼
                         ┌──────────┐     ┌──────────┐     ┌──────────┐
                         │ dark     │     │ light    │     │ light    │
                         │ theme    │     │ theme    │     │ (default)│
                         └──────────┘     └──────────┘     └──────────┘
```

## API Design

### Public API Surface

#### Components

All components are exported as named exports from their individual directories:

```typescript
// local-components/components/hero
export { Hero, type HeroProps } from './hero';

// local-components/components/layout
export { Layout, type LayoutProps } from './layout';

// local-components/components/section
export { Section, type SectionProps } from './section';

// local-components/components/typography
export { 
  Heading, type HeadingProps,
  Text, type TextProps,
  Lead, type LeadProps,
  Blockquote, type BlockquoteProps,
  Code, type CodeProps
} from './typography';

// local-components/components/card
export { Card, type CardProps } from './card';

// local-components/components/toggle
export { Toggle, type ToggleProps } from './toggle';

// local-components/components/button
export { Button, type ButtonProps, buttonVariants } from './button';
```

#### Theme System

```typescript
// local-components/lib/theme-context
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type ThemeProviderProps
} from './theme-context';
```

#### Utilities

```typescript
// local-components/lib/utils
export { cn } from './utils';
```

### Component APIs

#### Layout

```typescript
interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string; // default: 'local-components-theme'
}

function Layout(props: LayoutProps): JSX.Element;
```

#### Toggle (ThemeToggle)

```typescript
interface ToggleProps {
  variant?: 'icon' | 'button' | 'switch';
  showLabel?: boolean;
  className?: string;
}

function Toggle(props: ToggleProps): JSX.Element;
```

#### Hero

```typescript
interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  background?: {
    type: 'image' | 'color' | 'gradient';
    value: string;
  };
  alignment?: 'left' | 'center' | 'right';
  variant?: 'default' | 'minimal' | 'split' | 'full-bleed';
  asChild?: boolean;
}

function Hero(props: HeroProps): JSX.Element;
```

#### Card

```typescript
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  footer?: React.ReactNode;
  href?: string;
  variant?: 'default' | 'bordered' | 'ghost' | 'elevated';
  asChild?: boolean;
}

function Card(props: CardProps): JSX.Element;
```

#### Button

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'disabled';
  size?: 'default' | 'sm' | 'icon';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  asChild?: boolean;
}

function Button(props: ButtonProps): JSX.Element;
```

#### Typography (Heading)

```typescript
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

function Heading(props: HeadingProps): JSX.Element;
```

#### Section

```typescript
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  id?: string;
  background?: 'default' | 'alternate' | 'primary' | 'accent';
  spacing?: 'compact' | 'default' | 'spaced';
  children: React.ReactNode;
}

function Section(props: SectionProps): JSX.Element;
```

### Theme Context API

```typescript
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark'; // Actual theme (system resolved)
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Hook for consuming components
function useTheme(): ThemeContextValue;

// Provider component (used by Layout)
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}
```

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.0.0 | UI library (peer dependency) |
| React DOM | ^19.0.0 | DOM renderer (peer dependency) |
| TypeScript | ^5.0.0 | Type safety |
| Tailwind CSS | ^4.0.0 | Utility-first styling with CSS-first config |
| Radix UI Slot | ^1.0.0 | Composition primitive for `asChild` pattern |

### Build Tools

| Tool | Purpose |
|------|---------|
| bun | Fast JavaScript runtime, bundler, and package manager |
| bun-plugin-tailwind | Bun plugin for Tailwind CSS processing |

### Development Dependencies

| Package | Purpose |
|---------|---------|
| class-variance-authority | Type-safe Tailwind class composition |
| clsx | Conditional class merging |
| tailwind-merge | Tailwind class deduplication |
| @radix-ui/react-slot | Composition primitive |
| @types/react | React TypeScript definitions |
| @types/react-dom | React DOM TypeScript definitions |
| @types/bun | Bun runtime TypeScript definitions |
| oxlint | Fast Rust-based linter (called directly) |
| oxfmt | Fast Rust-based formatter (called directly) |
| tsgo | Fast Go-based TypeScript compiler |

### Documentation/Testing

| Tool | Purpose |
|------|---------|
| Storybook 10+ | Component documentation and testing |
| @storybook/react-vite | Storybook framework |
| @storybook/addon-essentials | Storybook addons |
| @storybook/addon-themes | Theme switching in Storybook |
| bun:test | Built-in fast test runner with TypeScript support |

### Tailwind CSS v4 Configuration

**CSS-First Configuration** (no JavaScript config file):

```css
/* src/styles/globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.1450 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1450 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.1450 0 0);
  --primary: oklch(0.5515 0.2467 272.5400);
  --primary-foreground: oklch(0.9850 0 0);
  --secondary: oklch(0.7134 0.1799 47.4500);
  --secondary-foreground: oklch(0.9850 0 0);
  --muted: oklch(0.9700 0 0);
  --muted-foreground: oklch(0.5560 0 0);
  --accent: oklch(0.8920 0.0373 218.0047);
  --accent-foreground: oklch(0.2050 0 0);
  --destructive: oklch(0.5770 0.2450 27.3250);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.9220 0 0);
  --input: oklch(0.9220 0 0);
  --ring: oklch(0.7080 0 0);
  --chart-1: oklch(0.8100 0.1000 252);
  --chart-2: oklch(0.6200 0.1900 260);
  --chart-3: oklch(0.5500 0.2200 263);
  --chart-4: oklch(0.4900 0.2200 264);
  --chart-5: oklch(0.4200 0.1800 266);
  --sidebar: oklch(0.9850 0 0);
  --sidebar-foreground: oklch(0.1450 0 0);
  --sidebar-primary: oklch(0.2050 0 0);
  --sidebar-primary-foreground: oklch(0.9850 0 0);
  --sidebar-accent: oklch(0.9700 0 0);
  --sidebar-accent-foreground: oklch(0.2050 0 0);
  --sidebar-border: oklch(0.9220 0 0);
  --sidebar-ring: oklch(0.7080 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.5515 0.2467 272.5400);
  --foreground: oklch(0.9850 0 0);
  --card: oklch(0.4800 0.2467 272.5400);
  --card-foreground: oklch(0.9850 0 0);
  --popover: oklch(0.4000 0.1200 272.5400);
  --popover-foreground: oklch(0.9850 0 0);
  --primary: oklch(0.9220 0 0);
  --primary-foreground: oklch(0.4000 0.2467 272.5400);
  --secondary: oklch(0.6600 0.1799 47.4500);
  --secondary-foreground: oklch(0.9850 0 0);
  --muted: oklch(0.4000 0.1200 272.5400);
  --muted-foreground: oklch(0.7080 0 0);
  --accent: oklch(0.3900 0.2467 272.5400);
  --accent-foreground: oklch(0.9850 0 0);
  --destructive: oklch(0.5770 0.2450 27.3250);
  --destructive-foreground: oklch(0.9850 0 0);
  --border: oklch(0.6600 0.0900 272.5400);
  --input: oklch(0.4000 0.0300 272.5400);
  --ring: oklch(0.6600 0.1800 272.5400);
  --chart-1: oklch(0.8100 0.1000 252);
  --chart-2: oklch(0.6200 0.1900 260);
  --chart-3: oklch(0.5500 0.2200 263);
  --chart-4: oklch(0.4900 0.2200 264);
  --chart-5: oklch(0.4200 0.1800 266);
  --sidebar: oklch(0.2050 0 0);
  --sidebar-foreground: oklch(0.9850 0 0);
  --sidebar-primary: oklch(0.4880 0.2430 264.3760);
  --sidebar-primary-foreground: oklch(0.9850 0 0);
  --sidebar-accent: oklch(0.2690 0 0);
  --sidebar-accent-foreground: oklch(0.9850 0 0);
  --sidebar-border: oklch(0.2750 0 0);
  --sidebar-ring: oklch(0.4390 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer !important;
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "checkJs": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "esModuleInterop": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["bun", "react", "react-dom"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Security Considerations

### XSS Prevention

1. **No dangerousHTML prop** - Components don't accept raw HTML strings
2. **React's built-in escaping** - All content is escaped by React's JSX
3. **No eval() or dynamic code execution** - No runtime code generation
4. **Safe href handling** - If href starts with `javascript:`, it's blocked

### CSP (Content Security Policy)

Components don't use inline styles (all styles via Tailwind classes), so they work with strict CSP policies:
```
Content-Security-Policy: style-src 'self'
```

### Dependency Security

1. **Minimal dependencies** - Only clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot (well-maintained, small, trusted)
2. **Peer dependencies** - React version controlled by consumer
3. **No networking** - No HTTP requests from components
4. **No storage beyond localStorage** - Only theme preference stored

### Accessibility Security

Components prevent focus trapping vulnerabilities:
- No custom focus management that could trap keyboard users
- Standard React event handling

## Scalability/Performance

### Bundle Size Budget

| Component | Max Size (gzipped) |
|-----------|-------------------|
| Hero | 2KB |
| Layout | 3KB (includes theme context) |
| Section | 1KB |
| Typography | 2KB (all variants) |
| Card | 1.5KB |
| Toggle | 1KB |
| Button | 1KB |
| Shared utils | 1KB (deduplicated across components) |

**Total if all imported**: ~9KB (tree-shaking prevents unused component code)

### Performance Optimizations

1. **No runtime CSS calculations** - All styles are static Tailwind classes
2. **Memoization** - Components use React.memo() where beneficial
3. **Lazy theme detection** - prefers-color-scheme check only on mount
4. **Debounced storage writes** - localStorage updates debounced (16ms)

### Memory Usage

- Theme context: Single context instance per Layout
- No component-level state for static components
- Event listeners cleaned up on unmount

### SSR Compatibility

1. **No window/document access during render** - Safe for SSR
2. **Hydration-safe theme detection** - Checks localStorage only after mount
3. **No FOUC (Flash of Unstyled Content)** - Theme class applied before first paint via blocking script (optional)

## Testing Strategy

### Phase 1: Manual Testing (Current)

**Storybook as Test Environment**:
- Each component has stories for all variants
- Stories include controls for all props
- Theme toggle decorator applied to all stories
- Viewport testing (mobile, tablet, desktop)

**Manual Test Checklist**:
- [ ] Component renders without console errors
- [ ] All props work as documented
- [ ] Visual appearance matches design specs
- [ ] Dark mode appearance correct
- [ ] Responsive behavior correct
- [ ] Keyboard navigation works
- [ ] Screen reader announcements correct
- [x] `asChild` composition works correctly

**Example Story Structure**:
```typescript
export default {
  title: 'Components/Button',
  component: Button,
  decorators: [withThemeDecorator], // Adds theme toggle
};

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="/link">Link Button</a>,
  },
};

export const DarkMode: Story = {
  ...Default,
  globals: { theme: 'dark' },
};
```

### Phase 2: Automated Testing (Future)

**Unit Tests** (React Testing Library):
- Component rendering tests
- Prop validation tests
- Event handling tests
- Accessibility tests (axe-core)
- `asChild` composition tests

**Integration Tests**:
- Theme context propagation
- Layout + Toggle interaction
- Component composition (Card inside Section, Button in Hero)

**Visual Regression Tests**:
- Chromatic or Percy for visual snapshots
- Test all variants in both themes

### Performance Testing

**Bundle Analysis**:
- Rollup plugin visualizer to check bundle composition
- Ensure tree-shaking works (dead code eliminated)

**Runtime Performance**:
- React DevTools Profiler to check render times
- Lighthouse CI for performance budget enforcement

## Deployment Plan(FUTURE)

### Build Process

```bash

# 1. Lint
bun run lint

# 2. Format check
bun run format

# 3. Type check
tsgo --noEmit

# 4. Build library

# 1. Clean dist/
rm -rf dist/

# 2. Type check
tsgo --noEmit

# 3. Build library

bun run build-lib.ts

```

### Build Output Structure

```
dist/
├── components/
│   ├── hero/
│   │   ├── index.js
│   │   └── index.d.ts
│   ├── layout/
│   ├── section/
│   ├── typography/
│   ├── card/
│   ├── toggle/
│   └── button/
├── lib/
│   ├── utils/
│   │   ├── index.js
│   │   └── index.d.ts
│   └── theme-context/
│       ├── index.js
│       └── index.d.ts
└── styles/
    └── globals.css        # Required Tailwind imports
```

### Package.json Exports Map

```json
{
  "exports": {
    ".": {
      "import": "./index.js",
      "types": "./index.d.ts"
    },
    "./components/*": {
      "import": "./components/*/index.js",
      "types": "./components/*/index.d.ts"
    },
    "./lib/*": {
      "import": "./lib/*/index.js",
      "types": "./lib/*/index.d.ts"
    },
    "./styles/*": "./styles/*"
  },
  "type": "module",
  "sideEffects": false
}
```

### Storybook Deployment

**Build**:
```bash
bunx storybook --package-manager bun build -o storybook-static
```

**Deploy** (user handles, likely Cloudflare):
- Cloudflare Pages from `storybook-static/` directory
- Or GitHub Actions → Cloudflare Pages

**Note**: Deployment implementation is out of scope for this TDD. User will configure CI/CD separately.

## Monitoring/Observability

### Build Monitoring

**Metrics to track**:
- Build time (should be <30s)
- Bundle size per component (budget: <5KB each)
- Type check time
- Linting results

**Alerts**:
- Build failures notify via CI/CD
- Bundle size budget exceeded

### Runtime Monitoring (Consumer Side)

Components don't include built-in analytics, but expose debugging info:

```typescript
// In development, warn about invalid prop combinations
if (process.env.NODE_ENV === 'development') {
  if (props.invalidCombo) {
    console.warn('[local-components] Invalid prop combination...');
  }
}
```

### Error Boundaries

Components don't catch errors internally - they throw and let React error boundaries handle them. This prevents silent failures.

## Out of Scope

The following are explicitly excluded from this TDD and the initial implementation:

1. **E2E Testing Infrastructure** - No Playwright/Cypress tests initially; Storybook manual testing only
2. **Animation Library Integration** - No Framer Motion or similar; CSS transitions only
3. **Advanced Form Components** - Inputs, selects, textareas; Button is included but not full form suite
4. **npm Package Publishing** - Source-available initially; publishing workflow in future
5. **Automated CI/CD** - No GitHub Actions workflows defined; manual builds only
6. **Design Tokens Abstraction** - Direct CSS variables usage, no tokens abstraction layer
7. **Figma Integration** - No design-to-code or Figma plugin
8. **Component Generator CLI** - No scaffolding scripts
9. **Browser Extension** - No companion tools
10. **System Theme Real-Time Sync** - Detects on load only, doesn't watch for OS changes while site is open
11. **Multiple Custom Themes** - Only light/dark mode, no custom accent colors per project
12. **CommonJS Support** - ESM only, no dual package
13. **Legacy React Support** - React 19+ only, no hooks/polyfills for older versions
14. **IE11 Support** - Modern browsers only (ES2020+)
15. **CSS-in-JS Runtime** - No styled-components, emotion, or similar

## Alternatives Considered

### Alternative: Direct shadcn/ui Registry

**Considered**: Using shadcn/ui's CLI to add components to each project

**Rejected because**:
- Requires running CLI in each project
- No centralized updates (manual sync across projects)
- No shared theme system
- Harder to maintain consistency across GEUT projects

### Alternative: CJS + ESM Dual Package

**Considered**: Publishing both CommonJS and ESM builds

**Rejected because**:
- Adds complexity to build process
- Dual package hazard (risk of duplicate React instances)
- Modern bundlers (Vite, esbuild, Webpack 5) handle ESM fine
- Node.js 12+ supports ESM natively

### Alternative: CSS-in-JS (styled-components)

**Considered**: Using styled-components for styling

**Rejected because**:
- Adds runtime dependency (~12KB)
- SSR complexity (collect styles, inject into head)
- No tree-shaking of unused styles
- Tailwind is already utility-first, no need for CSS-in-JS

### Alternative: Unstyled Components (Radix Primitives)

**Considered**: Building on Radix UI primitives

**Rejected because**:
- Adds complexity for simple layout components
- Radix is great for interactive components (dropdowns, dialogs) but overkill for Hero/Section/Layout
- Would require consumers to style everything (opposite of our goals)
- Toggle uses native button, not Radix

### Alternative: Full shadcn/ui Components

**Considered**: Just using shadcn/ui components directly

**Rejected because**:
- shadcn/ui is a registry, not a package
- No centralized component updates
- Doesn't include our specific components (Hero, Section, etc.)
- No built-in theme system with localStorage

### Alternative: Monorepo with Separate Packages

**Considered**: Separate packages per component (@local-components/hero, etc.)

**Rejected because**:
- Overkill for 7 components
- Publishing complexity (multiple npm packages)
- Harder to maintain shared utilities
- Individual imports work fine for tree-shaking

### Alternative: JavaScript-based Tailwind Config

**Considered**: Traditional `tailwind.config.js` approach

**Rejected because**:
- CSS-first configuration (Tailwind v4) is more maintainable
- Better performance (no JS config processing)
- Native CSS syntax is more familiar
- Better IDE support with CSS custom properties

### Alternative: JavaScript Config File for Library

**Considered**: Traditional `tsconfig.json` only without strict flags

**Rejected because**:
- Strict TypeScript catches more errors at compile time
- `verbatimModuleSyntax` preserves exact ESM imports/exports
- `noUncheckedIndexedAccess` improves array/object safety
- Path aliases (`@/`) improve developer experience

## Appendix: File Structure

### Source Tree

```
src/
├── components/
│   ├── hero/
│   │   ├── index.ts
│   │   └── hero.tsx
│   ├── layout/
│   │   ├── index.ts
│   │   ├── layout.tsx
│   │   └── layout.test.tsx (future)
│   ├── section/
│   │   ├── index.ts
│   │   └── section.tsx
│   ├── typography/
│   │   ├── index.ts
│   │   ├── heading.tsx
│   │   ├── text.tsx
│   │   ├── lead.tsx
│   │   ├── blockquote.tsx
│   │   └── code.tsx
│   ├── card/
│   │   ├── index.ts
│   │   └── card.tsx
│   ├── toggle/
│   │   ├── index.ts
│   │   ├── toggle.tsx
│   │   ├── sun-icon.tsx
│   │   └── moon-icon.tsx
│   └── button/
│       ├── index.ts
│       └── button.tsx
├── lib/
│   ├── utils/
│   │   ├── index.ts
│   │   └── utils.ts        # cn() function
│   └── theme-context/
│       ├── index.ts
│       └── theme-context.tsx
└── styles/
    └── globals.css         # Tailwind v4 CSS-first config
```

### Storybook Structure

```
.storybook/
├── main.ts                 # Storybook config
├── preview.ts              # Preview config (decorators)
├── preview-head.html       # Inject theme script
└── theme-decorator.tsx     # Theme toggle decorator

src/
└── components/
    └── button/
        ├── button.tsx
        └── button.stories.tsx   # Component stories
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | TBD | Initial release with 7 components, theme system, ESM-only build, CSS-first Tailwind v4, asChild composition |
| 1.1 | TBD | Extended from shadcn/ui foundation, integrated design skills (design-taste-frontend, shadcn-ui, impeccable), added Badge component, updated CSS configuration |

---

**References**:
- [Product Requirements Document](./PRD.md) - Business requirements and user stories
- Nicholas C. Zakas: [The importance of artifacts in AI-assisted programming](https://humanwhocodes.com/blog/2026/02/artifacts-ai-assisted-programming/)
- shadcn/ui: [Component patterns](https://ui.shadcn.com)
- shadcn/ui Customization: [How to Make Shadcn UI Components Actually Yours](https://ui.spectrumhq.in/blog/shadcn-customization-guide)
- Tailwind CSS v4: [CSS-first configuration](https://tailwindcss.com)
- Radix UI: [Slot primitive](https://www.radix-ui.com/primitives/docs/utilities/slot)
- design-taste-frontend: [Premium UI/UX skill](https://github.com/leonxlnx/taste-skill)
- impeccable: [Code quality skills](https://github.com/pbakaus/impeccable)
