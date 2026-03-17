import type { Meta, StoryObj } from '@storybook/react'
import { Check, AlertCircle, Info, Star } from 'lucide-react'
import { useState } from 'react'

import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Verified',
    variant: 'default',
    icon: <Check className='h-3 w-3' />,
  },
}

export const WithDifferentIcons: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge icon={<Check className='h-3 w-3' />}>Success</Badge>
      <Badge variant='destructive' icon={<AlertCircle className='h-3 w-3' />}>
        Error
      </Badge>
      <Badge variant='secondary' icon={<Info className='h-3 w-3' />}>
        Info
      </Badge>
      <Badge variant='outline' icon={<Star className='h-3 w-3' />}>
        Featured
      </Badge>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Badge dismissible onDismiss={() => setVisible(false)}>
        Click to dismiss
      </Badge>
    ) : (
      <button
        onClick={() => setVisible(true)}
        className='text-sm text-muted-foreground hover:text-foreground'
      >
        Reset badge
      </button>
    )
  },
}

export const DismissibleVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge dismissible onDismiss={() => {}}>
        Default
      </Badge>
      <Badge variant='secondary' dismissible onDismiss={() => {}}>
        Secondary
      </Badge>
      <Badge variant='destructive' dismissible onDismiss={() => {}}>
        Destructive
      </Badge>
      <Badge variant='outline' dismissible onDismiss={() => {}}>
        Outline
      </Badge>
    </div>
  ),
}

export const KitchenSink: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-4'>
      <div className='flex flex-wrap gap-2'>
        <Badge>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
        <Badge variant='ghost'>Ghost</Badge>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Badge icon={<Check className='h-3 w-3' />}>With Icon</Badge>
        <Badge variant='secondary' icon={<Info className='h-3 w-3' />}>
          Info
        </Badge>
        <Badge variant='destructive' icon={<AlertCircle className='h-3 w-3' />}>
          Alert
        </Badge>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Badge dismissible onDismiss={() => {}}>
          Dismissible
        </Badge>
        <Badge
          variant='outline'
          icon={<Star className='h-3 w-3' />}
          dismissible
          onDismiss={() => {}}
        >
          Featured
        </Badge>
      </div>
    </div>
  ),
}
