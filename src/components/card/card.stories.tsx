import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/button";
import { Card } from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "ghost", "elevated"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "This is a description of the card content.",
  },
};

export const Bordered: Story = {
  args: {
    title: "Bordered Card",
    description: "This card has a prominent border.",
    variant: "bordered",
  },
};

export const Ghost: Story = {
  args: {
    title: "Ghost Card",
    description: "This card has a transparent background.",
    variant: "ghost",
  },
};

export const Elevated: Story = {
  args: {
    title: "Elevated Card",
    description: "This card has a shadow for depth.",
    variant: "elevated",
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    description: "This card includes an image at the top.",
    image: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
      alt: "Abstract gradient",
    },
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    description: "This card has a footer with actions.",
    footer: (
      <div className="flex gap-2">
        <Button size="sm">View</Button>
        <Button size="sm" variant="ghost">
          Edit
        </Button>
      </div>
    ),
  },
};

export const LinkCard: Story = {
  args: {
    title: "Link Card",
    description: "Click this card to navigate.",
    href: "/example",
    variant: "elevated",
  },
};

export const Complete: Story = {
  args: {
    title: "Complete Card",
    description: "A card with all features enabled.",
    image: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
      alt: "Abstract gradient",
    },
    footer: <Button>Learn More</Button>,
    variant: "default",
  },
};
