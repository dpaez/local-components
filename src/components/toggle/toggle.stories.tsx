import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './toggle'
import { Layout } from '../layout/layout'

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
      <Layout defaultTheme="light" storageKey="storybook-theme">
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
