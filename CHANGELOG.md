# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0-alpha.0] - 2026-03-10

### Added
- Initial alpha release
- 8 core components with Technical Geometric aesthetic:
  - **Hero** - Landing sections with multiple background types (image, color, gradient, mesh)
  - **Layout** - Theme provider with automatic dark mode detection and localStorage persistence
  - **Section** - Logical content grouping with anchor links
  - **Typography** - Complete text hierarchy (Heading, Text, Lead, Blockquote, Code)
  - **Card** - Content containers with image support, multiple variants (default, bordered, ghost, elevated)
  - **Button** - Multiple variants (primary, secondary, ghost, outline, CTA) with icon support
  - **Toggle** - Theme switcher with sun/moon icons and switch variant
  - **Badge** - Labels and tags with dismissible option
- **Theme System** - Dark/light/system modes with automatic OS preference detection
- **Technical Geometric Design** - Asymmetric corners, bevels, sharp angles for sci-fi minimal aesthetic
- **TypeScript Support** - Full type definitions with declaration files
- **Tree-shakeable ESM** - Import only what you need
- **Tailwind CSS v4 Integration** - CSS-first configuration with OKLCH color tokens
- **Storybook Documentation** - Interactive component playground
- **Accessibility** - Built on Radix UI primitives, keyboard navigation support

### Technical
- ESM-only architecture (no CommonJS)
- Peer dependencies: React 19+, React DOM 19+
- Zero runtime CSS-in-JS
- System fonts only (no external font loading)
- Minimal bundle impact with tree-shaking

## [0.0.1] - 2026-03-03

### Added
- Project initialization
- Design system documentation (DESIGN.md, PRD.md, TDD.md)
- Initial component architecture planning
