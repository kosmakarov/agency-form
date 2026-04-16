'use client'

import { useState } from 'react'
import Link from 'next/link'

const quotes = [
  {
    niche: 'Цветочный магазин',
    text: 'У меня нет ежедневных, да и еженедельных классных кейсов, которые можно рассказывать в Reels. Обычный день предпринимателя, нет каких-то сверх сложностей, много рутины. Я вроде и так её показываю. Обучать флористике — не моё, обучать предпринимательству — тем более. На чём строить контент?'
  },
  {
    niche: 'Владелец магазина',
    text: 'Как быть, если у меня сейчас большое желание закрыть магазин, так как грядёт 2026 год. Но мне бы не хотелось заранее об этом говорить. И сразу вопрос — если закроемся 31.12, что дальше-то в блоге говорить? Я уже не предприниматель.'
  },
  {
    niche: 'Предприниматель',
    text: 'Каша в голове. Совет — как Костя видит меня со стороны, о чём мне можно было бы вещать.'
  },
  {
    niche: 'Предприниматель',
    text: 'Как совмещать личные проекты, семью, работу и не бросать вести блог?'
  },
  {
    niche: 'Иммиграционная компания',
    text: 'Блог нужен для выстраивания доверия и больших продаж. Главный затык — начать и побороть перфекционизм, убрать фомо по поводу ИИ-контента и начать уже делать хоть что-то.'
  },
  {
    niche: 'Импорт из Китая',
    text: 'Планирую ехать жить в Китай и снимать контент на выставках и производствах. Но самая основная проблема возможно в голове — боюсь камеру. Ролики которые пытался делать, кажется что выгляжу как клоун. Думал взять очки Ray-Ban и вести контент от прямого лица.'
  },
  {
    niche: 'Продажи на маркетплейсах',
    text: 'Продаю на ВБ женскую обувь. Цель блога — расти в подписчиках и переливать трафик в Telegram, там уже продавать обувь. Но блог вести не об обуви. Не понимаю о чём.'
  },
  {
    niche: 'Производство латуни',
    text: 'У меня производство изделий из латуни для интерьера. Создали новую страницу, так как старая ушла в тень. Затык — как набрать свою ЦА и как можно быстрее.'
  },
  {
    niche: 'Запчасти для спецтехники',
    text: 'Блог нулевой, только собираюсь делать. Продаём запчасти к сельхозтехнике и спецтехнике. Затык — не могу собраться это сделать.'
  },
  {
    niche: 'Продажа авто из Китая',
    text: 'Могу поехать на фабрику, показать машины, товары. Не могу понять, как сделать так, чтобы контент именно продавал. Тестировал — сделал ролик где дети взрывают бомбочки в Китае, 15 000 просмотров. А там где машину продаю — 200 просмотров. Хочется понять, как делать контент, чтобы он именно продавал.'
  },
  {
    niche: 'Ресторанный сервис',
    text: 'Можем ли мы с тобой личный бренд мой качнуть с целью популяризации моего сервиса — привлечь рестораторов, потом и банк, чтобы сервис продать.'
  },
  {
    niche: 'B2B сервис',
    text: 'Хочу понять, можно ли продвигать себя и свой продукт в B2B сегменте, и если да — то как это делать.'
  },
  {
    niche: 'Владелец бизнеса с SMM',
    text: 'Мой блог стоит мёртвым грузом, инстаграм совсем не продаёт. Несмотря на то, что мы работаем с SMM и стараемся. Развития нет сильного. Очень маленький прирост подписчиков, заявок из инст нет совсем. Вроде уже и упаковались и бренд сделали. А всё стоит.'
  },
  {
    niche: 'Супруга предпринимателя',
    text: 'Моя супруга сейчас пытается забустить свой личный блог, но пока что это получается безуспешно. Не может найти именно тот формат, который будет тем самым. У неё крайне специфичная ниша.'
  },
  {
    niche: 'IT-консалтинг',
    text: 'Сам не понимаю толком, зачем блог. По идее что-то я должен продавать, а вот что — хз. Задача на этот год определиться, но немного страшно идти в публичность. Думал что-то комментировать стартапы и новости из мира технологий, экспертность прокачивать, и люди брали бы консультации по развитию компании.'
  },
  {
    niche: 'AI-консалтинг',
    text: 'Не могу понять, что хочу снимать и как выстроить систему. Цель — зарабатывать на доп услугах. Но пока не понимаю, что будет лучше: AI в брендинге/маркетинге/продукте, или COO на аутсорсе. В общем, пока раздрай. Не могу свою фишку вытащить.'
  },
  {
    niche: 'Предприниматель с блогом',
    text: 'Цель — вырастить лояльную платёжеспособную аудиторию. Главный затык — мало подписок, либо приходят, но потом не смотрят в сторис и не покупают услуги.'
  },
  {
    niche: 'Вопрос про формат',
    text: 'Какой мне показывать контент, какого формата? Это должны быть супер-фишки, пять пунктов? Или кейсы до-после? Или просто ежедневная рутина? Стоит ли делать лайф-контент и экспертный, чтобы подписывались предприниматели и уже обращались за услугой?'
  },
  {
    niche: 'Вопрос про позиционирование',
    text: 'Как позиционировать себя? На какие темы определиться и снимать блог? Ты делегируешь или сам делаешь? Как сценарии прорабатываешь, что важно? Просто понять бы, как Костя вдохновляется — он сидит и пишет сам сценарий?'
  }
]

export default function ConsultPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [showAllQuotes, setShowAllQuotes] = useState(false)
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

  const visibleQuotes = showAllQuotes ? quotes : quotes.slice(0, 8)

  const CTAButton = () => (
    <button
      onClick={() => setShowPaymentForm(true)}
      className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-[#0a0a0a] font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(196,163,90,0.3)]"
    >
      Записаться на консультацию — 10 000 ₽
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  )

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
          <div className="text-center mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-5 py-2 rounded-full mb-6 tracking-widest uppercase">
              Консультация
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-3">
              Консультация по личному блогу
            </h1>

            <p className="text-lg text-white/60">
              Один на один · 1.5 часа · онлайн
            </p>
          </div>

          {/* VSL Video - Main Focus */}
          <div className="relative aspect-video bg-[#151515] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              className="w-full h-full"
              controls
              preload="metadata"
              playsInline
              poster="/vsl-poster.png"
            >
              <source src="/vsl.mp4" type="video/mp4" />
            </video>
          </div>

          <p className="text-white/40 text-sm mt-4 text-center">2:44</p>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-3">
            С чем приходят на консультацию
          </h2>
          <p className="text-white/50 text-center mb-12">
            Вот реальные сообщения, которые мне пишут в директ перед тем, как записаться.
          </p>

          {/* Quotes Grid */}
          <div className="columns-1 md:columns-2 gap-4 space-y-4">
            {visibleQuotes.map((quote, index) => (
              <div
                key={index}
                className="break-inside-avoid p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl"
              >
                <p className="text-gold text-sm font-medium mb-2">{quote.niche}</p>
                <p className="text-white/70 leading-relaxed">«{quote.text}»</p>
              </div>
            ))}
          </div>

          {/* Show more button */}
          {!showAllQuotes && quotes.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllQuotes(true)}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Показать ещё {quotes.length - 8} сообщений
              </button>
            </div>
          )}

          {/* Conclusion */}
          <p className="text-xl sm:text-2xl font-medium text-center mt-16 text-white/80">
            Ниши разные. Запрос один — «я не понимаю, кто я и про что говорить».
          </p>

          {/* CTA after quotes */}
          <div className="text-center mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">
            Отзывы
          </h2>

          <div className="space-y-8">
            <div>
              <video
                className="w-full rounded-2xl"
                controls
                preload="metadata"
                playsInline
                poster="/review-1-poster.jpg"
              >
                <source src="/review-1.mp4" type="video/mp4" />
              </video>
              <p className="text-white/60 text-sm mt-3 text-center">
                <span className="text-white">Евгения Бажина</span> · Маркетплейсы, Самара
              </p>
            </div>

            <div>
              <video
                className="w-full rounded-2xl"
                controls
                preload="metadata"
                playsInline
                poster="/review-2-poster.jpg"
              >
                <source src="/review-2.mp4" type="video/mp4" />
              </video>
              <p className="text-white/60 text-sm mt-3 text-center">
                <span className="text-white">Евгения Бажина</span> · Маркетплейсы, Самара
              </p>
            </div>
          </div>

          {/* CTA after reviews */}
          <div className="text-center mt-12">
            <CTAButton />
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
          onClick={() => setShowPaymentForm(true)}
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
