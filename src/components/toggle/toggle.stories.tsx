import type { Meta, StoryObj } from '@storybook/react'
import { Lightbulb, LightbulbOff } from 'lucide-react'

import { Layout } from '../layout/layout'
import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'button', 'switch'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <Layout defaultTheme='light' storageKey='storybook-theme'>
        <Story />
      </Layout>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Icon: Story = {
  args: {
    variant: 'icon',
  },
}

export const Button: Story = {
  args: {
    variant: 'button',
    showLabel: true,
  },
}

export const Switch: Story = {
  args: {
    variant: 'switch',
  },
}

export const ButtonWithoutLabel: Story = {
  args: {
    variant: 'button',
    showLabel: false,
  },
}

export const ButtonWithCustomIcons: Story = {
  args: {
    variant: 'button',
    showLabel: false,
    darkIcon: <Lightbulb className='h-4 w-4 transition-all' />,
    lightIcon: <LightbulbOff className='h-4 w-4 transition-all' />,
  },
}
