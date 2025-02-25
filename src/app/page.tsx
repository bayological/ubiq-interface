import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  description: 'Your Smart Universal Income, Powered by AI & Blockchain',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-30 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Your Smart Universal Income, Powered by AI & Blockchain
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Turn idle treasury ETH into universal basic income for the
            world—chat with UBIQ to claim your fair share, manage tokens, and
            unlock financial freedom.
          </p>
          <div className="mt-8">
            <Button href="/try">Try UBIQ Now</Button>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
