import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Анкета предзаписи | Бутиковое агентство',
  description: 'Заполните анкету для предварительной записи на консультацию',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-forest-950 min-h-screen">
        {children}
      </body>
    </html>
  )
}
