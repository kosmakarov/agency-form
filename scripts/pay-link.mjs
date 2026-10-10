// Ссылка на оплату с любой суммой.
// node scripts/pay-link.mjs 25000 "Сопровождение по контент-маркетингу"
// Ключ: PAY_LINK_SECRET, тот же, что на Vercel
import { createHash, createHmac } from 'crypto'

const [amountArg, ...descParts] = process.argv.slice(2)
const amount = Number(String(amountArg || '').replace(/[\s.,](?=\d{3}\b)/g, ''))
const description = descParts.join(' ').trim()
if (!Number.isFinite(amount) || amount <= 0 || !description) {
  console.error('Использование: node scripts/pay-link.mjs <сумма> "<услуга>"')
  process.exit(1)
}

const secret = process.env.PAY_LINK_SECRET?.trim()
const key = secret ? createHash('sha256').update(secret).digest() : null
if (!key) {
  console.error('Нет PAY_LINK_SECRET')
  process.exit(1)
}

const base = process.env.PAY_LINK_BASE || 'https://agency-form-lac.vercel.app'
const payload = Buffer.from(JSON.stringify({ a: amount, d: description })).toString('base64url')
const sig = createHmac('sha256', key).update(payload).digest('base64url')
console.log(`${base}/pay?t=${payload}.${sig}`)
