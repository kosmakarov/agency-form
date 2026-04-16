'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DirectPayPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async (paymentMethod: 'sbp' | 'bank_card') => {
    setError('')

    if (!email) {
      setError('Укажите email для отправки чека')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, paymentMethod }),
      })

      const data = await response.json()

      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl
      } else {
        console.error('Payment error:', data)
        setError(data.error || 'Ошибка создания платежа')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Ошибка соединения. Попробуйте ещё раз.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-2">Оплата консультации</h1>
        <p className="text-white/40 text-sm mb-2">10 000 ₽ · 1.5 часа · онлайн</p>
        <p className="text-white/60 text-sm mb-6">
          Разберёмся, зачем тебе блог. Уйдёшь с ясностью, темами и планом.
        </p>

        {/* VPN Warning */}
        <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mb-6">
          <p className="text-white text-sm">
            ⚠️ Если у вас включён VPN — выключите его перед оплатой
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-white/40 mb-2">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/20 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-white/40 mb-2">
              Email <span className="text-gold">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/20 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
              placeholder="Для отправки чека"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* SBP Button - Primary */}
          <button
            type="button"
            onClick={() => handlePayment('sbp')}
            disabled={isLoading}
            className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/50 text-[#0a0a0a] font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Переход к оплате...' : 'Оплатить через СБП'}
          </button>

          {/* Card Button - Secondary */}
          <button
            type="button"
            onClick={() => handlePayment('bank_card')}
            disabled={isLoading}
            className="w-full text-white/40 hover:text-white text-sm py-2 transition-colors"
          >
            Оплатить картой
          </button>

          <p className="text-white/30 text-xs text-center">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <Link href="/offer" className="underline hover:text-white">
              договором оферты
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
