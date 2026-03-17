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
    noise: {
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
      <div className='bg-primary-500 p-8 text-primary-foreground'>
        <h1 className='text-2xl font-bold'>Layout Content</h1>
        <p>This layout uses the default settings.</p>
      </div>
    ),
    maxWidth: 'lg',
    padding: 'md',
    centered: true,
    noise: true,
    defaultTheme: 'light',
  },
}

export const FullWidth: Story = {
  args: {
    children: (
      <div className='bg-muted p-8'>
        <h1 className='text-2xl font-bold'>Full Width Layout</h1>
        <p>This layout spans the full width.</p>
      </div>
    ),
    maxWidth: 'full',
    padding: 'none',
    defaultTheme: 'light',
  },
}

export const CoolBorders: Story = {
  render: () => (
    <Layout maxWidth='full' defaultTheme='light' borders='lr'>
      <div className='flex h-screen flex-1 flex-col items-center justify-center gap-4 '>
        <div className='bezel bg-primary-600 p-4 text-primary-foreground dark:bg-secondary-600 '>
          <h1 className='text-2xl font-bold'>Borders Layout</h1>
          <p>This layout has cool borders.</p>
        </div>
      </div>
    </Layout>
  ),
}

export const Small: Story = {
  args: {
    children: (
      <div className='rounded-lg bg-secondary-500 p-8 text-secondary-foreground'>
        <h1 className='text-2xl font-bold'>Small Layout</h1>
        <p>This layout has a small max-width.</p>
      </div>
    ),
    maxWidth: 'sm',
    padding: 'none',
    centered: true,
    noise: true,
    defaultTheme: 'light',
  },
}

export const WithDarkTheme: Story = {
  args: {
    children: (
      <div className='rounded-lg bg-primary p-8 text-primary-foreground'>
        <h1 className='text-2xl font-bold'>Dark Theme Layout</h1>
        <p>This layout defaults to dark theme.</p>
      </div>
    ),
    maxWidth: 'md',
    padding: 'md',
    centered: true,
    defaultTheme: 'dark',
  },
}
