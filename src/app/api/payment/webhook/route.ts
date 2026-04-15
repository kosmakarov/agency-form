import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendTelegramNotification(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })
  } catch (error) {
    console.error('Telegram notification error:', error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // YooKassa sends payment.succeeded event
    if (body.event === 'payment.succeeded') {
      const payment = body.object
      const metadata = payment.metadata || {}

      const message = `
💰 <b>Новая оплата консультации!</b>

Сумма: ${payment.amount.value} ${payment.amount.currency}
Email: ${metadata.email || 'не указан'}
Имя: ${metadata.name || 'не указано'}
ID платежа: ${payment.id}

Свяжись с клиентом для согласования времени.
      `.trim()

      await sendTelegramNotification(message)
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    // Still return 200 to prevent retries
    return NextResponse.json({ success: true })
  }
}
