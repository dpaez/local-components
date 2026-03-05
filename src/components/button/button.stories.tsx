import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRight, Download } from 'lucide-react'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['medium', 'sm', 'icon'],
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: <ArrowRight />,
    iconPosition: 'end',
  },
}

export const IconOnly: Story = {
  args: {
    icon: <Download />,
    size: 'icon',
    'aria-label': 'Download',
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href='/'>Link Button</a>,
    variant: 'ghost',
  },
}
