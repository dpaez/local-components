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
      options: ['primary', 'secondary', 'ghost', 'outline', 'cta'],
    },
    size: {
      control: 'select',
      options: ['sm', 'medium', 'lg', 'icon'],
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

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
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

export const CTA: Story = {
  args: {
    children: 'Call to Action',
    variant: 'cta',
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA button features an animated gradient border effect.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="medium">Medium (Default)</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
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

export const KitchenSink: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="cta">CTA</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button icon={<ArrowRight />}>Icon Start</Button>
        <Button icon={<ArrowRight />} iconPosition="end">Icon End</Button>
      </div>
    </div>
  ),
}
