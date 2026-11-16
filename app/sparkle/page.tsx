import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import { SparkleCard } from '@/components/sparkle/sparkle-card'

export const metadata: Metadata = {
  title: 'Ink sparkle demo',
  description: 'WebGL ink sparkle ripple rendered with a custom GLSL fragment shader.',
}

async function readShader(name: string) {
  return readFile(path.join(process.cwd(), 'public', 'shaders', name), 'utf8')
}

export default async function SparklePage() {
  const [fragmentSource, vertexSource] = await Promise.all([
    readShader('ink_sparkle.frag'),
    readShader('ink_sparkle.vert'),
  ])

  return (
    <main className="dark flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-4 py-10 text-foreground">
      <SparkleCard fragmentSource={fragmentSource} vertexSource={vertexSource} />
      <p className="max-w-md text-balance text-center text-sm leading-relaxed text-muted-foreground">
        Tap or move across the card to spawn ink sparkle ripples.
      </p>
    </main>
  )
}
