'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConsultPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
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

  const scrollToPayment = () => {
    document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero Section with VSL Video */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Ocean Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/50 to-[#0a0a0a]/80" />

        <div className="max-w-4xl w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-5 py-2 rounded-full mb-6 tracking-widest uppercase">
              Консультация
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Разберёмся, зачем тебе <span className="text-gold">блог</span>
            </h1>

            <p className="text-lg text-white/60 mb-2">
              Посмотри это видео — расскажу, чем могу помочь
            </p>
          </div>

          {/* VSL Video - Main Focus */}
          <div className="relative aspect-video bg-[#151515] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Placeholder - replace when VSL is ready */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center cursor-pointer hover:bg-gold/30 transition-colors">
                  <svg className="w-12 h-12 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-white/40 text-sm">Видео скоро появится</p>
              </div>
            </div>
            {/* Uncomment when VSL is ready:
            <video
              className="w-full h-full"
              controls
              preload="metadata"
              playsInline
              poster="/vsl-poster.jpg"
            >
              <source src="/vsl.mp4" type="video/mp4" />
            </video>
            */}
          </div>

          <p className="text-white/40 text-sm mt-4 text-center">6 минут</p>

          {/* CTA after video */}
          <div className="text-center mt-10">
            <button
              onClick={scrollToPayment}
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(196,163,90,0.3)]"
            >
              Записаться на консультацию
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-16">
            Что ты получишь
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-300">
              <h3 className="text-gold text-xl font-semibold mb-4">Ясность</h3>
              <p className="text-white/60 leading-relaxed">
                Поймёшь, зачем тебе блог на самом деле — не абстрактно «для бизнеса», а конкретно. Чтобы не бросить через месяц.
              </p>
            </div>

            <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-300">
              <h3 className="text-gold text-xl font-semibold mb-4">Уникальность</h3>
              <p className="text-white/60 leading-relaxed">
                Увижу, в чём твоя сила, и покажу тебе. Какие темы, какой формат, какие истории из твоей жизни зацепят аудиторию.
              </p>
            </div>

            <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-300">
              <h3 className="text-gold text-xl font-semibold mb-4">Первый шаг</h3>
              <p className="text-white/60 leading-relaxed">
                Уйдёшь с конкретными темами и пониманием, что делать завтра. Не стратегия на 50 страниц — а ясный план на первую неделю.
              </p>
            </div>
          </div>

          {/* For Whom */}
          <p className="text-lg text-white/50 leading-relaxed text-center mt-16 max-w-2xl mx-auto">
            Если ты предприниматель или эксперт, который понимает что блог нужен, но всё никак не начнёт. Или уже пробовал — и не получилось.
          </p>
        </div>
      </section>

      {/* Price & Payment Section */}
      <section id="payment" className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-5xl sm:text-6xl font-semibold mb-4">
            10 000 ₽
          </p>
          <p className="text-white/40 mb-10">
            1.5 часа · один на один · онлайн
          </p>

          <button
            onClick={() => setShowPaymentForm(true)}
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold px-10 py-5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(196,163,90,0.3)]"
          >
            Записаться и оплатить
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-sm mx-auto">
          <p className="text-white/40 text-sm mb-6 text-center">Отзыв от Евгении Бажиной</p>
          <div className="space-y-4">
            <video
              className="w-full rounded-2xl"
              controls
              preload="metadata"
              playsInline
              poster="/review-1-poster.jpg"
            >
              <source src="/review-1.mp4" type="video/mp4" />
            </video>
            <video
              className="w-full rounded-2xl"
              controls
              preload="metadata"
              playsInline
              poster="/review-2-poster.jpg"
            >
              <source src="/review-2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:justify-between gap-8">
          <div className="text-white/40 text-sm space-y-1">
            <p>ИП Макаров Константин Александрович</p>
            <p>ОГРНИП 319631300129246</p>
            <p>ИНН 633012547575</p>
          </div>

          <div className="flex flex-col sm:items-end gap-4 text-sm">
            <div className="flex gap-6">
              <Link href="/offer" className="text-white/40 hover:text-white transition-colors underline underline-offset-4">
                Договор оферты
              </Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors underline underline-offset-4">
                Политика конфиденциальности
              </Link>
            </div>
            <p className="text-white/40">
              © 2025 Все права защищены
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 sm:hidden z-40">
        <button
          onClick={scrollToPayment}
          className="block w-full bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold py-4 rounded-lg text-center transition-colors duration-200"
        >
          Записаться · 10 000 ₽
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
            {/* Close button */}
            <button
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-semibold mb-2">Оплата консультации</h3>
            <p className="text-white/40 text-sm mb-4">10 000 ₽ · 1.5 часа</p>

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
        </div>
      )}
    </main>
  )
}
