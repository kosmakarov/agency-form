import { NextResponse } from 'next/server'
import { decodePayLink } from '@/lib/payLink'
import { PRODUCTS, DEFAULT_PRODUCT, type Product } from '@/lib/products'

// Что нужно для создания платежа. Полные данные услуги — в @/lib/products.
type PaymentSpec = Pick<Product, 'value' | 'description' | 'itemDescription' | 'successPath'>

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
    const { email, name, paymentMethod, product, link } = body

    if (!email) {
      return NextResponse.json({ error: 'Email обязателен для чека' }, { status: 400 })
    }

    // Ссылка с подписанной суммой (/pay?t=...) или продукт из каталога
    let productKey: string
    let p: PaymentSpec
    if (link !== undefined) {
      const custom = decodePayLink(link)
      if (!custom) {
        return NextResponse.json({ error: 'Ссылка на оплату недействительна' }, { status: 400 })
      }
      productKey = 'link'
      p = {
        value: custom.amount.toFixed(2),
        description: custom.description,
        itemDescription: custom.description,
        successPath: '/consult/success',
      }
    } else {
      // Выбираем продукт (по умолчанию — консультация, для обратной совместимости)
      productKey = typeof product === 'string' && PRODUCTS[product] ? product : DEFAULT_PRODUCT
      p = PRODUCTS[productKey]
    }

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
