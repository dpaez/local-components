import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './layout'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    centered: {
      control: 'boolean',
    },
    defaultTheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 bg-muted rounded-lg">
        <h1 className="text-2xl font-bold">Layout Content</h1>
        <p>This layout uses the default settings.</p>
      </div>
    ),
    maxWidth: 'lg',
    padding: 'md',
    centered: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: (
      <div className="p-8 bg-muted rounded-lg">
        <h1 className="text-2xl font-bold">Full Width Layout</h1>
        <p>This layout spans the full width.</p>
      </div>
    ),
    maxWidth: 'full',
    padding: 'lg',
  },
}

export const Small: Story = {
  args: {
    children: (
      <div className="p-8 bg-muted rounded-lg">
        <h1 className="text-2xl font-bold">Small Layout</h1>
        <p>This layout has a small max-width.</p>
      </div>
    ),
    maxWidth: 'sm',
    padding: 'md',
    centered: true,
  },
}

export const WithDarkTheme: Story = {
  args: {
    children: (
      <div className="p-8 bg-primary text-primary-foreground rounded-lg">
        <h1 className="text-2xl font-bold">Dark Theme Layout</h1>
        <p>This layout defaults to dark theme.</p>
      </div>
    ),
    maxWidth: 'md',
    padding: 'md',
    centered: true,
    defaultTheme: 'dark',
  },
}
