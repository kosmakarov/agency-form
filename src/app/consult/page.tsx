import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Консультация по блогу | Костя',
  description: 'Персональная консультация по развитию блога. 1.5 часа один на один.',
}

export default function ConsultPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-cream">
      {/* Main content */}
      <div className="max-w-2xl mx-auto px-5 py-10 pb-32 sm:pb-16">

        {/* 1. Video Section */}
        <section className="mb-16">
          <div className="relative aspect-video bg-dark-card rounded-xl overflow-hidden">
            {/* Video player - replace src when video is uploaded */}
            <video
              className="w-full h-full object-cover"
              poster="/consult-poster.jpg"
              controls
              preload="metadata"
              playsInline
            >
              <source src="/consult-video.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            {/* Placeholder overlay - remove when video is uploaded */}
            <div className="absolute inset-0 flex items-center justify-center bg-dark-card">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-cream-muted text-sm">Видео скоро появится</p>
              </div>
            </div>
          </div>
          <p className="text-cream-muted text-sm mt-3 text-center">6 минут</p>
        </section>

        {/* 2. Benefits Section */}
        <section className="mb-16">
          <h2 className="font-georgia text-2xl sm:text-3xl mb-10 text-center">
            Что вы получите
          </h2>

          <div className="space-y-10">
            {/* Benefit 1 */}
            <div>
              <h3 className="text-gold font-georgia text-xl mb-3">Ясность</h3>
              <p className="text-cream/90 leading-relaxed">
                Поймёте, зачем вам блог на самом деле — не абстрактно «для бизнеса», а конкретно. Чтобы не бросить через месяц.
              </p>
            </div>

            {/* Benefit 2 */}
            <div>
              <h3 className="text-gold font-georgia text-xl mb-3">Уникальность</h3>
              <p className="text-cream/90 leading-relaxed">
                Я увижу, в чём ваша сила, и покажу вам. Какие темы, какой формат, какие истории из вашей жизни зацепят аудиторию.
              </p>
            </div>

            {/* Benefit 3 */}
            <div>
              <h3 className="text-gold font-georgia text-xl mb-3">Первый шаг</h3>
              <p className="text-cream/90 leading-relaxed">
                Уйдёте с конкретными темами и пониманием, что делать завтра. Не стратегия на 50 страниц — а ясный план на первую неделю.
              </p>
            </div>
          </div>
        </section>

        {/* 3. For Whom Section */}
        <section className="mb-16">
          <p className="text-cream/80 text-lg leading-relaxed text-center">
            Если вы предприниматель или эксперт, который понимает что блог нужен, но всё никак не начнёт. Или уже пробовал — и не получилось.
          </p>
        </section>

        {/* 4. Testimonial Section */}
        <section className="mb-16">
          <p className="text-cream-muted text-sm mb-6 text-center">Отзыв от Евгении Бажиной</p>
          <div className="space-y-3 max-w-xs mx-auto">
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
        </section>

        {/* 5. Price Section */}
        <section className="text-center mb-8">
          <div className="mb-6">
            <p className="text-4xl sm:text-5xl font-georgia text-cream mb-3">
              10 000 ₽
            </p>
            <p className="text-cream-muted">
              1.5 часа · один на один · онлайн
            </p>
          </div>

          {/* Desktop CTA */}
          <a
            href="#"
            className="hidden sm:inline-block bg-gold hover:bg-gold-light text-dark-bg font-medium px-10 py-4 rounded-lg transition-colors duration-200"
          >
            Выбрать время
          </a>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-[#0D0D14] border-t border-cream/5 mt-16 pb-24 sm:pb-8">
        <div className="max-w-4xl mx-auto px-5 py-10">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            {/* Left side - Legal info */}
            <div className="text-cream-muted text-sm space-y-1">
              <p className="text-cream font-medium mb-3">КОСТЯ</p>
              <p>ИП Макаров Константин Александрович</p>
              <p>ОГРНИП 319631300129246</p>
              <p>ИНН 633012547575</p>
            </div>

            {/* Right side - Links */}
            <div className="flex flex-col sm:items-end gap-4 text-sm">
              <div className="flex gap-6">
                <a href="/offer" className="text-cream-muted hover:text-cream transition-colors underline underline-offset-4">
                  Договор оферты
                </a>
                <a href="/privacy" className="text-cream-muted hover:text-cream transition-colors underline underline-offset-4">
                  Политика конфиденциальности
                </a>
              </div>
              <p className="text-cream-muted">
                © 2025 Все права защищены
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark-bg/95 backdrop-blur-sm border-t border-cream/10 sm:hidden">
        <a
          href="#"
          className="block w-full bg-gold hover:bg-gold-light text-dark-bg font-medium py-4 rounded-lg text-center transition-colors duration-200"
        >
          Выбрать время
        </a>
      </div>
    </main>
  )
}
