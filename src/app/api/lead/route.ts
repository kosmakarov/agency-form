import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  name: string
  contact: string
  instagram: string
  business: string
  blogGoal: string
  blogGoalOther: string
  previousExperience: string
  blogBudget: string
  marketingBudget: string
  threeMonths: string
  successMetric: string
}

function formatTelegramMessage(data: LeadData): string {
  const blogGoalText = data.blogGoal === 'другое'
    ? `Другое: ${data.blogGoalOther}`
    : data.blogGoal

  return `📋 НОВАЯ ЗАЯВКА

👤 Имя: ${data.name}
📱 Контакт: ${data.contact}
${data.instagram ? `📸 Instagram: ${data.instagram}` : ''}

🏢 О бизнесе:
${data.business}

🎯 Цель блога: ${blogGoalText}

📝 Предыдущий опыт:
${data.previousExperience}

💰 Бюджет на блог: ${data.blogBudget}
📊 Бюджет на маркетинг: ${data.marketingBudget}

⏱ Готов работать 3+ месяцев: ${data.threeMonths === 'да' ? 'Да' : 'Нет'}

🎯 Ожидаемый результат:
${data.successMetric}`
}

async function sendToTelegram(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured')
    return false
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    )

    const result = await response.json()

    if (!result.ok) {
      console.error('Telegram API error:', result)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    // Validate required fields
    if (!data.name || !data.contact || !data.business || !data.blogGoal ||
        !data.previousExperience || !data.blogBudget || !data.marketingBudget ||
        !data.threeMonths || !data.successMetric) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Format and send message
    const message = formatTelegramMessage(data)
    const sent = await sendToTelegram(message)

    if (!sent) {
      return NextResponse.json(
        { error: 'Ошибка отправки. Попробуйте позже.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка сервера' },
      { status: 500 }
    )
  }
}
