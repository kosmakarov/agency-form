import { createHash, createHmac, timingSafeEqual } from 'crypto'

// Ссылки на оплату с любой суммой: /pay?t=<payload>.<sig>
// payload — base64url от {"a": сумма, "d": "название услуги"},
// sig — HMAC-SHA256 с ключом PAY_LINK_SECRET (тот же ключ у агента на сервере).
// Ссылки делает агент скриптом scripts/pay-link.mjs.

export type PayLink = { amount: number; description: string }

function linkKey(): Buffer | null {
  const secret = process.env.PAY_LINK_SECRET?.trim()
  if (!secret) return null
  return createHash('sha256').update(secret).digest()
}

export function decodePayLink(token: unknown): PayLink | null {
  if (typeof token !== 'string') return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null

  const key = linkKey()
  if (!key) return null

  const expected = createHmac('sha256', key).update(payload).digest()
  const got = Buffer.from(sig, 'base64url')
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const amount = Number(data.a)
    const description = String(data.d || '').trim()
    if (!Number.isFinite(amount) || amount <= 0 || !description) return null
    return { amount, description }
  } catch {
    return null
  }
}
