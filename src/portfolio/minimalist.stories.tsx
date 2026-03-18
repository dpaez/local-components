import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

import { Badge } from '@/components/badge/badge'
import { Button } from '@/components/button/button'
import { Card } from '@/components/card/card'
import { Hero } from '@/components/hero/hero'
import { Layout } from '@/components/layout/layout'
import { Section } from '@/components/section/section'
import { Toggle } from '@/components/toggle/toggle'
import { Blockquote } from '@/components/typography/blockquote'
import { Heading } from '@/components/typography/heading'
import { Lead } from '@/components/typography/lead'
import { Text } from '@/components/typography/text'

// Minimalist Engineer Portfolio Page Component
const MinimalistEngineerPortfolio = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Layout defaultTheme='light' className='min-h-screen' noise maxWidth='full' padding='none'>
      {/* Hero Section - Full bleed with subtle gradient */}
      <Hero
        title='John Doe'
        subtitle='Software Engineer · Co-founder at Company · P2P Systems Architect'
        alignment='center'
        background={{
          type: 'gradient',
          value: 'linear-gradient(135deg, var(--background) 0%, var(--muted) 100%)',
        }}
        cta={{
          label: 'View Projects',
          href: '#experience',
        }}
      />

      {/* About Section */}
      <Section id='about' title='About' spacing='default'>
        <div className='mx-auto max-w-3xl'>
          <Lead className='mb-8'>
            Hi, I am John Doe also known as Mr Pmosh (he/him). Class '83. Natural from Patagonia,
            Argentina.
          </Lead>

          <Text className='mb-6 text-muted-foreground'>
            I have a Licentiate's Degree in Computer Science from the EDU
          </Text>

          <Text className='mb-6 text-muted-foreground'>
            In 2018, I co-founded Company, an exclusive software consultancy company and a Lab for
            P2P projects. A few years later in Q4 2020, started Product. Company's flagship P2P
            product.
          </Text>

          <Blockquote>"Always looking to mix ideas, like an alchemist for thoughts."</Blockquote>

          <Text className='text-muted-foreground'>
            My current goal is around learning and shaping the business-side of Product, the
            decentralized live audio platform.
          </Text>
        </div>
      </Section>

      {/* Experience Section - Timeline style */}
      <Section id='experience' title='Experience' background='alternate' spacing='spaced'>
        <div className='mx-auto max-w-3xl space-y-8'>
          {/* Company */}
          <div className='relative border-l-2 border-border pl-8'>
            <div className='absolute top-0 -left-2 h-4 w-4 rounded-full bg-primary' />
            <Heading as='h3' size='lg' className='mb-2'>
              Co-founder at Company
            </Heading>
            <Text size='sm' color='muted' className='mb-4'>
              2018 - Present
            </Text>
            <Text className='text-muted-foreground'>
              Co-founded Company, an exclusive software consultancy company and a laboratory for
              peer-to-peer (P2P) projects. In Q4 2020, launched Product as Company's flagship P2P
              product.
            </Text>
            <div className='mt-4 flex gap-2'>
              <Button variant='ghost' size='sm' asChild>
                <a href='https://example.com' target='_blank' rel='noopener noreferrer'>
                  Visit Company
                </a>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <a href='https://sher.geutstudio.com' target='_blank' rel='noopener noreferrer'>
                  Explore Product
                </a>
              </Button>
            </div>
          </div>

          {/* Previous Experience */}
          <div className='relative border-l-2 border-border pl-8'>
            <div className='absolute top-0 -left-2 h-4 w-4 rounded-full bg-secondary' />
            <Heading as='h3' size='lg' className='mb-2'>
              Previous Experience
            </Heading>
            <ul className='mt-4 space-y-4'>
              <li>
                <Text className='font-medium'>Fullstack Engineer at Another Company</Text>
                <Text size='sm' color='muted'>
                  Worked on a components-as-a-service project, creating components rendered and
                  consumed by different teams.
                </Text>
              </li>
              <li>
                <Text className='font-medium'>Assistant Professor at EDU</Text>
                <Text size='sm' color='muted'>
                  Taught "User Centered Design" and "Mobile Devices' Interfaces". Fantastic
                  experience preparing lectures and practical exercises.
                </Text>
              </li>
              <li>
                <Text className='font-medium'>Researcher at Special Lab</Text>
                <Text size='sm' color='muted'>
                  HCI and user-centered design research.
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Skills Section - Minimal tags */}
      <Section id='skills' title='Skills' spacing='default'>
        <div className='mx-auto max-w-3xl'>
          <div className='flex flex-wrap gap-3'>
            {[
              'JavaScript',
              'Node.js',
              'Distributed Systems',
              'P2P',
              'React',
              'HCI',
              'Fullstack',
            ].map((skill) => (
              <Badge key={skill} variant='secondary'>
                {skill}
              </Badge>
            ))}
          </div>

          <Text className='mt-8 text-muted-foreground'>
            From fullstack development going through custom JS solutions to distributed systems and
            P2P product development.
          </Text>
        </div>
      </Section>

      {/* Talks Section - Clean card layout */}
      <Section id='talks' title='Talks & Workshops' background='alternate' spacing='spaced'>
        <div className='mx-auto max-w-4xl'>
          <Lead className='mb-8 text-center'>
            Sharing experiences and organizing ideas is always a heartwarming experience.
          </Lead>

          <div className='grid gap-6'>
            <Card
              title='Building Up on Dat'
              description='NodeConf Colombia 2019. Topics: dat, decentralization, p2p, ecosystem.'
              footer={
                <Button variant='ghost' size='sm' asChild>
                  <a
                    href='https://github.com/geut/building-up-on-dat'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View Talk
                  </a>
                </Button>
              }
            />

            <Card
              title='Dat Workshop'
              description='NodeConf Argentina 2018. With Martin Acosta. Topics: dat, p2p, chat app.'
              footer={
                <Button variant='ghost' size='sm' asChild>
                  <a
                    href='https://github.com/geut/dat-workshop'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View Workshop
                  </a>
                </Button>
              }
            />

            <Card
              title='Micro (hapi) ness'
              description='NodeConf Argentina 2016. Topics: microservices, nodejs, p2p, hapijs.'
            />

            <Card
              title='Multimodal Interactions & JS'
              description='Node Interactive North America 2016. Topics: HCI, UX, IoT, JavaScript.'
            />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id='contact' title='Contact' spacing='default'>
        <div className='mx-auto max-w-3xl text-center'>
          <Text className='mb-6 text-lg'>You can reach me at</Text>

          <Heading as='h3' size='lg' className='mb-8 font-mono'>
            contact@geutstudio.com
          </Heading>

          <div className='flex flex-wrap justify-center gap-4'>
            <Button variant='outline' asChild>
              <a href='https://github.com/handle' target='_blank' rel='noopener noreferrer'>
                GitHub
              </a>
            </Button>
            <Button variant='outline' asChild>
              <a href='https://twitter.com/username' target='_blank' rel='noopener noreferrer'>
                Twitter
              </a>
            </Button>
            <Button variant='outline' asChild>
              <a href='https://geutstudio.com' target='_blank' rel='noopener noreferrer'>
                Company
              </a>
            </Button>
            <Button variant='outline' asChild>
              <a href='https://sher.geutstudio.com' target='_blank' rel='noopener noreferrer'>
                Product
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className='border-t px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row'>
          <Text size='sm' color='muted'>
            {currentYear} John Doe. All rights reserved.
          </Text>

          <div className='flex items-center gap-4'>
            <Text size='sm' color='muted'>
              Toggle theme
            </Text>
            <Toggle variant='icon' />
          </div>
        </div>
      </footer>
    </Layout>
  )
}

// Storybook configuration
const meta: Meta<typeof MinimalistEngineerPortfolio> = {
  title: 'Portfolio/Minimalist Engineer',
  component: MinimalistEngineerPortfolio,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
A clean, DASEIN-inspired portfolio layout featuring:
- Strong typography hierarchy
- Single-column section-based layout
- Timeline-style experience presentation
- Minimal skills badges
- Clean card-based talks section
- Theme toggle integration

Skills applied: normalize, polish
Design variance: 1-3 (predictable, symmetrical)
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MinimalistEngineerPortfolio>

// Main story
export const Default: Story = {
  render: () => <MinimalistEngineerPortfolio />,
}

// Light mode only
export const LightMode: Story = {
  render: () => (
    <div className='light'>
      <MinimalistEngineerPortfolio />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
}

// Dark mode only
export const DarkMode: Story = {
  render: () => (
    <div className='dark'>
      <MinimalistEngineerPortfolio />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
