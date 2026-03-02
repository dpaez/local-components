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
    subtitle: 'Content is aligned to the left side.',
    alignment: 'left',
  },
}

export const RightAligned: Story = {
  args: {
    title: 'Right Aligned Hero',
    subtitle: 'Content is aligned to the right side.',
    alignment: 'right',
  },
}

export const WithBackgroundImage: Story = {
  args: {
    title: 'Hero with Background',
    subtitle: 'This hero has a background image with overlay.',
    background: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&auto=format&fit=crop&q=60',
    },
    cta: {
      label: 'Learn More',
      href: '/about',
    },
  },
}

export const WithBackgroundColor: Story = {
  args: {
    title: 'Colored Background',
    subtitle: 'This hero has a custom background color.',
    background: {
      type: 'color',
      value: '#1a1a2e',
    },
    variant: 'default',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const Split: Story = {
  args: {
    title: 'Split Hero',
    subtitle: 'A hero with split layout for showcasing images.',
    variant: 'split',
    background: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=60',
    },
  },
}
