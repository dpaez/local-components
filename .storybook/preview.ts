import type { Preview } from '@storybook/react'
import '../styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', icon: 'circle', title: 'Light' },
          { value: 'dark', icon: 'circlehollow', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const theme = context.globals.theme
      document.documentElement.classList.remove('light', 'dark')
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
      return storyFn()
    },
  ],
}

export default preview
