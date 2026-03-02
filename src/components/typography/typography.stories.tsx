import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './heading'
import { Text } from './text'
import { Lead } from './lead'
import { Blockquote } from './blockquote'
import { Code } from './code'

const meta: Meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'padded',
  },
}

export default meta

export const HeadingStory: StoryObj<typeof Heading> = {
  name: 'Heading',
  render: () => (
    <div className="space-y-4">
      <Heading as="h1">Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </div>
  ),
}

export const TextStory: StoryObj<typeof Text> = {
  name: 'Text',
  render: () => (
    <div className="space-y-4">
      <Text size="lg">Large text for important content.</Text>
      <Text>Default text for body content.</Text>
      <Text size="sm">Small text for secondary content.</Text>
      <Text size="xs">Extra small text for fine print.</Text>
      <Text color="muted">Muted text for less emphasis.</Text>
    </div>
  ),
}

export const LeadStory: StoryObj<typeof Lead> = {
  name: 'Lead',
  render: () => (
    <Lead>
      This is a lead paragraph, typically used for introductions or summaries.
      It stands out with larger text and muted color.
    </Lead>
  ),
}

export const BlockquoteStory: StoryObj<typeof Blockquote> = {
  name: 'Blockquote',
  render: () => (
    <Blockquote>
      "The best way to predict the future is to create it."
    </Blockquote>
  ),
}

export const CodeStory: StoryObj<typeof Code> = {
  name: 'Code',
  render: () => (
    <div className="space-y-2">
      <Text>
        Use the <Code>npm install</Code> command to install dependencies.
      </Text>
      <Text>
        Run <Code>npm run dev</Code> to start the development server.
      </Text>
    </div>
  ),
}
