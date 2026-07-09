import { NextResponse } from 'next/server'

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY

// Каталог продуктов. Цена берётся ТОЛЬКО отсюда по ключу продукта —
// клиент не может подменить сумму, передаёт лишь ключ.
const PRODUCTS: Record<string, {
  value: string
  description: string
  itemDescription: string
  successPath: string
}> = {
  consult: {
    value: '15000.00',
    description: 'Консультация по блогу (1.5 часа)',
    itemDescription: 'Консультация по развитию блога',
    successPath: '/consult/success',
  },
  founders: {
    value: '69900.00',
    description: 'Сериал Основателя — личное сопровождение по внедрению блога',
    itemDescription: 'Сериал Основателя (личное сопровождение)',
    successPath: '/founders/success',
  },
}

export async function POST(request: Request) {
  try {
    // Check credentials
    if (!YOOKASSA_SHOP_ID || !YOOKASSA_SECRET_KEY) {
      console.error('Missing YooKassa credentials')
      return NextResponse.json({ error: 'Платёжная система не настроена' }, { status: 500 })
    }

    const body = await request.json()
    const { email, name, paymentMethod, product } = body

    if (!email) {
      return NextResponse.json({ error: 'Email обязателен для чека' }, { status: 400 })
    }

    // Выбираем продукт (по умолчанию — консультация, для обратной совместимости)
    const productKey = typeof product === 'string' && PRODUCTS[product] ? product : 'consult'
    const p = PRODUCTS[productKey]

    console.log('Creating payment for:', email, 'method:', paymentMethod, 'product:', productKey)

    // Generate idempotence key
    const idempotenceKey = crypto.randomUUID()

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agency-form-lac.vercel.app'

    // Build payment request
    const paymentData: Record<string, unknown> = {
      amount: {
        value: p.value,
        currency: 'RUB',
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: `${baseUrl}${p.successPath}`,
      },
      description: p.description,
      receipt: {
        customer: {
          email: email,
        },
        items: [
          {
            description: p.itemDescription,
            quantity: '1',
            amount: {
              value: p.value,
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
        product: productKey,
      },
    }

    // If specific payment method requested, add it
    if (paymentMethod === 'sbp') {
      paymentData.payment_method_data = { type: 'sbp' }
    } else if (paymentMethod === 'bank_card') {
      paymentData.payment_method_data = { type: 'bank_card' }
    }

    // Create payment via YooKassa API
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        'Authorization': 'Basic ' + Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString('base64'),
      },
      body: JSON.stringify(paymentData),
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
