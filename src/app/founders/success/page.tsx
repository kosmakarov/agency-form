import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Оплата прошла успешно | Костя',
  description: 'Спасибо за оплату «Сериала Основателя»',
}

export default function FoundersSuccessPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-cream flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-georgia text-3xl sm:text-4xl mb-4">
          Оплата прошла успешно
        </h1>

        <p className="text-cream/80 text-lg mb-8 leading-relaxed">
          Спасибо! Ты в «Сериале Основателя». Я свяжусь с тобой в течение дня, чтобы согласовать старт и первый шаг.
        </p>

        <p className="text-cream-muted text-sm mb-8">
          Чек отправлен на вашу почту.
        </p>
      </div>
    </main>
  )
}
