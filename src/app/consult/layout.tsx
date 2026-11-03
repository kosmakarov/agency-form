import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Консультация по блогу | Костя',
  description: 'Персональная консультация по развитию блога. 1.5 часа один на один.',
}

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
