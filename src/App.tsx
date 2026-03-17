import { Button } from './components/button/button'

import './index.css'
import { Card } from './components/card/card'
import { Hero } from './components/hero/hero'
import { Layout } from './components/layout/layout'
import { Section } from './components/section/section'
import { Toggle } from './components/toggle/toggle'
import { Heading } from './components/typography/heading'
import { Text } from './components/typography/text'

export function App() {
  return (
    <Layout
      maxWidth='lg'
      padding='none'
      centered={true}
      defaultTheme='light'
      storageKey='local-components-theme'
    >
      <Hero
        title='Welcome to Local Components'
        subtitle='A brief description'
        background={{ type: 'color', value: '#efefef' }}
        cta={{ label: 'Get Started', href: '/start' }}
        alignment='center'
      />
      <div className='relative z-10 mx-auto flex h-screen flex-col  items-center justify-center gap-4 text-center'>
        <Section background='primary' spacing='spaced'>
          <Heading as='h1' size='2xl'>
            Local Components
          </Heading>
          <Text className='text-primary-foreground'>Development View</Text>
          <div className='flex justify-start bg-accent p-4'>
            <Button className='rounded-full' variant='primary'>
              Click me
            </Button>
          </div>
        </Section>

        <Section background='alternate' spacing='default'>
          <Toggle variant='switch' className='bg-primary dark:bg-primary-foreground' />

          <Card
            title='Card Title'
            description='Card Description'
            image={{ src: 'https://picsum.photos/200/300', alt: 'Card Image' }}
            variant='elevated'
            footer={<Button className='rounded-full'>Click me</Button>}
          />
        </Section>
      </div>
    </Layout>
  )
}

export default App
