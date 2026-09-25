import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог под ключ за 3 дня | Костя',
  description: 'Блог под ключ за 3 дня. Личная работа один на один.',
}

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
