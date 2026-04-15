import { NextResponse } from 'next/server'

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY

export async function POST(request: Request) {
  try {
    // Check credentials
    if (!YOOKASSA_SHOP_ID || !YOOKASSA_SECRET_KEY) {
      console.error('Missing YooKassa credentials')
      return NextResponse.json({ error: 'Платёжная система не настроена' }, { status: 500 })
    }

    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ error: 'Email обязателен для чека' }, { status: 400 })
    }

    console.log('Creating payment for:', email)

    // Generate idempotence key
    const idempotenceKey = crypto.randomUUID()

    // Create payment via YooKassa API
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        'Authorization': 'Basic ' + Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: {
          value: '10000.00',
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://agency-form-lac.vercel.app'}/consult/success`,
        },
        description: 'Консультация по блогу (1.5 часа)',
        receipt: {
          customer: {
            email: email,
          },
          items: [
            {
              description: 'Консультация по развитию блога',
              quantity: '1',
              amount: {
                value: '10000.00',
                currency: 'RUB',
              },
              vat_code: 1, // Без НДС
              payment_mode: 'full_payment',
              payment_subject: 'service',
            },
          ],
        },
        metadata: {
          name: name || '',
          email: email,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('YooKassa error:', JSON.stringify(data, null, 2))
      const errorMessage = data.description || data.message || 'Ошибка создания платежа'
      return NextResponse.json({ error: errorMessage, details: data }, { status: 500 })
    }

    // Return confirmation URL for redirect
    return NextResponse.json({
      confirmationUrl: data.confirmation.confirmation_url,
      paymentId: data.id,
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
