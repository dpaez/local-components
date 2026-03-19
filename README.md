# Local Components

> Local: relating or restricted to a particular area or one's neighbourhood.

A curated React component library designed specifically for personal sites and portfolio pages. Built with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui patterns.

## Features

- **7 Foundational Components**: Hero, Layout, Section, Typography, Card, Toggle, Button
- **Built-in Theme System**: Dark/light mode with automatic OS preference detection
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Tailwind-First**: Easy customization using Tailwind CSS utility classes
- **Tree-Shakeable**: Import only the components you need
- **Accessible**: Built on Radix UI primitives for accessibility

## Requirements

- React 19+
- React DOM 19+
- Tailwind CSS 4+
- TypeScript 5+ (recommended)

## Installation

### Future (npm package)

```bash
npm install local-components
```

### Local Development

Clone the repository and build locally:

```bash
git clone https://github.com/dpaez/local-components.git
cd local-components
bun install
```

## Quick Start

### 1. Setup Tailwind CSS

Import the required styles in your app's entry point:

```tsx
import "local-components/styles/globals.css"
```

### 2. Wrap Your App with Layout

```tsx
import { Layout } from "local-components/layout"

function App() {
  return (
    <Layout defaultTheme="system" storageKey="theme-preference">
      <YourApp />
    </Layout>
  )
}
```

### 3. Use Components

```tsx
import { Hero } from "local-components/hero"

function HomePage() {
  return (
    <Hero
      title="Welcome to My Site"
      subtitle="A brief description"
      cta={{ label: "Get Started", href: "#about" }}
    />
  )
}
```

## Theme Configuration

The library includes a theme system with automatic dark mode support.

### Using Layout Component

The `Layout` component provides the theme context for your app:

```tsx
import { Layout } from "local-components/layout"

<Layout 
  defaultTheme="system"  // "light" | "dark" | "system"
  storageKey="my-app-theme"
  maxWidth="lg"
  padding="md"
  centered
>
  {children}
</Layout>
```

### Using Theme Toggle

Add a theme toggle button anywhere in your app:

```tsx
import { Toggle } from "local-components/toggle"

// Icon-only toggle (default)
<Toggle variant="icon" />

// Button with label
<Toggle variant="button" showLabel />

// Switch style
<Toggle variant="switch" />
```

### Customizing Themes

The theme uses CSS variables defined in `globals.css`. Override them in your own CSS:

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: oklch(0.5 0.2 270);
  /* ... other variables */
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  /* ... other variables */
}
```

## Component Usage Examples

### Button

```tsx
import { Button } from "local-components/button"

// Variants
<Button variant="primary">Primary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="disabled">Disabled</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="icon">
  <Icon />
</Button>

// With icons
<Button icon={<Download />} iconPosition="start">
  Download
</Button>
```

### Hero

```tsx
import { Hero } from "local-components/hero"

// Basic hero
<Hero
  title="Hello, I'm John"
  subtitle="Full-stack developer"
/>

// With CTA
<Hero
  title="Welcome"
  subtitle="Check out my work"
  cta={{ label: "View Projects", href: "/projects" }}
  variant="default"
  alignment="center"
/>

// With background image
<Hero
  title="Portfolio"
  subtitle="My latest work"
  background={{ type: "image", value: "/bg.jpg" }}
/>
```

### Card

```tsx
import { Card } from "local-components/card"
import { Button } from "local-components/button"

// Basic card
<Card title="Project Name" description="A brief description">
  Additional content
</Card>

// With image
<Card
  title="Blog Post"
  description="Read more about this topic"
  image={{ src: "/image.jpg", alt: "Description" }}
  footer={<Button>Read More</Button>}
/>

// Clickable card
<Card
  title="Linked Card"
  description="Click to navigate"
  href="/destination"
/>

// Variants
<Card variant="default">Default</Card>
<Card variant="bordered">Bordered</Card>
<Card variant="ghost">Ghost</Card>
<Card variant="elevated">Elevated</Card>
```

### Section

```tsx
import { Section } from "local-components/section"

// Basic section
<Section title="About" subtitle="Learn more about me">
  Content here
</Section>

// With background colors
<Section background="primary" title="Features">
  Primary background content
</Section>

<Section background="alternate" spacing="spaced">
  Alternate background with more spacing
</Section>
```

### Typography

```tsx
import { Heading } from "local-components/typography/heading"
import { Text } from "local-components/typography/text"
import { Lead } from "local-components/typography/lead"
import { Blockquote } from "local-components/typography/blockquote"
import { Code } from "local-components/typography/code"

// Heading
<Heading size="2xl">Page Title</Heading>
<Heading as="h2" size="lg" weight="semibold">
  Section Heading
</Heading>

// Text
<Text size="lg" color="muted">
  Large muted text
</Text>

// Lead (intro text)
<Lead>
  This is an introductory paragraph with larger text.
</Lead>

// Blockquote
<Blockquote cite="Author Name">
  A memorable quote goes here.
</Blockquote>

// Code
<Code>const example = "code"</Code>
```

## Tree-Shaking Import Patterns

Import individual components for optimal bundle size:

```tsx
// Good - Tree-shakeable
import { Button } from "local-components/button"
import { Hero } from "local-components/hero"
import { Card } from "local-components/card"

// Good - Typography sub-components (tree-shakeable)
import { Heading } from "local-components/typography/heading"
import { Text } from "local-components/typography/text"
import { Lead } from "local-components/typography/lead"
import { Blockquote } from "local-components/typography/blockquote"
import { Code } from "local-components/typography/code"

// Utilities
import { cn } from "local-components/utils"
import { ThemeProvider, useTheme } from "local-components/theme-context"
```

## Tailwind Configuration

The library uses Tailwind CSS v4 with CSS-first configuration. Ensure your project:

1. Has Tailwind CSS v4 installed
2. Imports the library's CSS variables (via `globals.css`)
3. Uses the same CSS variable naming convention for theming

## API Overview

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `icon`, `iconPosition`, `asChild` | Interactive button element |
| `Hero` | `title`, `subtitle`, `cta`, `background`, `variant`, `alignment` | Landing section component |
| `Card` | `title`, `description`, `image`, `footer`, `href`, `variant` | Content container |
| `Section` | `title`, `subtitle`, `background`, `spacing` | Page section wrapper |
| `Toggle` | `variant`, `showLabel` | Theme toggle button |
| `Layout` | `maxWidth`, `padding`, `centered`, `defaultTheme`, `storageKey` | App wrapper with theme |
| `Heading` | `size`, `weight`, `align`, `as` | Typography heading |
| `Text` | `size`, `weight`, `color`, `align`, `as` | Typography text |
| `Lead` | Same as Text | Introductory text |
| `Blockquote` | `cite` | Quote block |
| `Code` | - | Inline code |

### Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `useTheme()` | `{ theme, resolvedTheme, setTheme, toggleTheme }` | Access theme state |

### Utilities

| Function | Description |
|----------|-------------|
| `cn(...inputs)` | Merge Tailwind classes with conflict resolution |

## Interactive Documentation

Explore all components with interactive props at our [Storybook](https://dpaez.github.io/local-components):

```bash
# Run Storybook locally
bun run storybook
```

## Development

### Build the Library

```bash
# Build for production
bun run build:lib
```

### Run Tests

```bash
# Type check
bun run lint

# Format check
bun run format:check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Why local-components?

Seems like a good opportunity to work with agents and update my personal site. :handshake:

## License

MIT © [Diego Paez](https://github.com/dpaez)
