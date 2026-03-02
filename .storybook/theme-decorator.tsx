import * as React from 'react'
import type { StoryContext } from '@storybook/react'

export const ThemeDecorator = (Story: React.FC, context: StoryContext) => {
  const theme = context.globals.theme
  
  // Apply theme class to document root
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }
  
  return <Story />
}
