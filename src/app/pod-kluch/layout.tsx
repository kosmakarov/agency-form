import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог под ключ за 3 дня | Костя',
  description: 'Стратегия блога под твою жизнь и бизнес и первый ролик под ключ.',
}

export default function TurnkeyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
