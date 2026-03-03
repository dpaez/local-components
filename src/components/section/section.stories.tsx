import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../card/card";
import { Section } from "./section";

const meta: Meta<typeof Section> = {
  title: "Components/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    background: {
      control: "select",
      options: ["default", "alternate", "primary", "accent"],
    },
    spacing: {
      control: "select",
      options: ["compact", "default", "spaced"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: "Section Title",
    subtitle: "This is a subtitle for the section.",
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Card 1" description="First card content" />
        <Card title="Card 2" description="Second card content" />
        <Card title="Card 3" description="Third card content" />
      </div>
    ),
  },
};

export const Compact: Story = {
  args: {
    title: "Compact Section",
    spacing: "compact",
    children: <p>Content with compact spacing.</p>,
  },
};

export const Spaced: Story = {
  args: {
    title: "Spaced Section",
    spacing: "spaced",
    children: <p>Content with more vertical spacing.</p>,
  },
};

export const AlternateBackground: Story = {
  args: {
    title: "Alternate Background",
    background: "alternate",
    children: <p>This section has an alternate background color.</p>,
  },
};

export const PrimaryBackground: Story = {
  args: {
    title: "Primary Background",
    background: "primary",
    children: <p>This section uses the primary color as background.</p>,
  },
};

export const AccentBackground: Story = {
  args: {
    title: "Accent Background",
    background: "accent",
    children: <p>This section uses the accent color as background.</p>,
  },
};

export const WithAnchor: Story = {
  args: {
    id: "features",
    title: "Features Section",
    subtitle: "Navigate to this section with #features",
    children: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Feature 1" description="Description of feature 1" />
        <Card title="Feature 2" description="Description of feature 2" />
        <Card title="Feature 3" description="Description of feature 3" />
      </div>
    ),
  },
};
