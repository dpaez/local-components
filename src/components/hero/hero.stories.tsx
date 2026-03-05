import type { Meta, StoryObj } from '@storybook/react'

import { Hero } from './hero'

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'split', 'full-bleed'],
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: {
    title: 'Welcome to Local Components',
    subtitle: 'A curated React component library for personal sites and portfolio pages.',
  },
}

export const WithCta: Story = {
  args: {
    title: 'Build Something Amazing',
    subtitle: 'Get started with our beautiful, accessible components.',
    cta: {
      label: 'Get Started',
      href: '/docs',
      variant: 'primary',
    },
  },
}

export const Minimal: Story = {
  args: {
    title: 'Minimal Hero',
    subtitle: 'A compact hero section for smaller headers.',
    variant: 'minimal',
  },
}

export const FullBleed: Story = {
  args: {
    title: 'Full Bleed Hero',
    subtitle: 'This hero spans the full viewport height.',
    variant: 'full-bleed',
    cta: {
      label: 'Explore',
      href: '/explore',
      variant: 'secondary',
    },
  },
}

export const LeftAligned: Story = {
  args: {
    title: 'Left Aligned Hero',
    subtitle: 'Content is aligned to the left side with vertical centering.',
    alignment: 'left',
  },
}

export const RightAligned: Story = {
  args: {
    title: 'Right Aligned Hero',
    subtitle: 'Content is aligned to the right side with vertical centering.',
    alignment: 'right',
  },
}

export const AlignmentShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <Hero
        title="Left Aligned"
        subtitle="Perfect for text-heavy layouts with supporting content on the right."
        alignment="left"
        variant="minimal"
      />
      <Hero
        title="Center Aligned"
        subtitle="Classic centered layout for impact and focus."
        alignment="center"
        variant="minimal"
      />
      <Hero
        title="Right Aligned"
        subtitle="Ideal for showcasing visuals or code snippets on the left."
        alignment="right"
        variant="minimal"
      />
    </div>
  ),
}

export const WithBackgroundImage: Story = {
  args: {
    title: 'Hero with Background Image',
    subtitle: 'This hero uses a high-quality image from a reliable placeholder service.',
    background: {
      type: 'image',
      value: 'https://picsum.photos/seed/localcomponents/1920/1080',
    },
    cta: {
      label: 'Learn More',
      href: '/about',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Uses picsum.photos with a seed for consistent, reliable placeholder images.',
      },
    },
  },
}

export const WithBackgroundColor: Story = {
  args: {
    title: 'Theme Background Color',
    subtitle: 'This hero uses the primary color from the theme. Text automatically adjusts for contrast.',
    background: {
      type: 'color',
      value: 'var(--primary)',
    },
    cta: {
      label: 'View Components',
      href: '/components',
      variant: 'secondary',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Uses CSS custom properties for theme-aware background colors with automatic text contrast.',
      },
    },
  },
}

export const WithGradient: Story = {
  args: {
    title: 'Gradient Background',
    subtitle: 'A smooth gradient using theme colors for visual depth.',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
    },
    cta: {
      label: 'Get Started',
      href: '/start',
    },
  },
}

export const Split: Story = {
  args: {
    title: 'Split Layout Hero',
    subtitle: 'A two-column layout with content on the left and visual space on the right. The right column displays a gradient placeholder when no image is provided.',
    variant: 'split',
  },
  parameters: {
    docs: {
      description: {
        story: 'Split layout creates a 50/50 grid on large screens. Content is centered vertically on the left, with a visual area on the right.',
      },
    },
  },
}

export const SplitWithImage: Story = {
  args: {
    title: 'Split with Visual',
    subtitle: 'The split layout shines when combined with a compelling image or illustration.',
    variant: 'split',
    background: {
      type: 'image',
      value: 'https://picsum.photos/seed/splitlayout/800/1000',
    },
    cta: {
      label: 'View Project',
      href: '/project',
    },
  },
}

export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-0">
      <Hero
        title="Premium Component Library"
        subtitle="Built with modern tools: React 19, TypeScript, Tailwind CSS v4, and shadcn/ui."
        variant="default"
        cta={{
          label: 'Explore Components',
          href: '/components',
        }}
      />
      <Hero
        title="Split Layout"
        subtitle="Showcase your work with the split hero layout."
        variant="split"
        background={{
          type: 'image',
          value: 'https://picsum.photos/seed/showcase/800/1000',
        }}
        alignment="left"
      />
    </div>
  ),
}
