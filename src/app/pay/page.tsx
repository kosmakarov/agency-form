import type { Metadata } from 'next'
import { decodePayLink } from '@/lib/payLink'
import PayForm from './PayForm'

export const metadata: Metadata = {
  title: 'Оплата | Костя',
  robots: { index: false },
}

export default function PayPage({ searchParams }: { searchParams: { t?: string } }) {
  const link = decodePayLink(searchParams.t)

  if (!link) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <p className="text-white/60 text-center">Ссылка на оплату недействительна. Напишите Косте, он пришлёт новую.</p>
      </main>
    )
  }

  return <PayForm token={searchParams.t!} amount={link.amount} description={link.description} />
}
