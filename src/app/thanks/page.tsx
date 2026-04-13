import Link from 'next/link'

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        {/* Success icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-forest-700 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-ivory-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-ivory-100 mb-6">
          Спасибо
        </h1>

        <p className="text-forest-300 text-lg leading-relaxed mb-10">
          Посмотрю анкету и напишу вам в течение дня.
        </p>

        {/* Back link */}
        <Link
          href="/"
          className="inline-block text-forest-400 hover:text-forest-300 transition-colors underline underline-offset-4"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  )
}
