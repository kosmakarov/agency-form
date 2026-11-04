// Каталог услуг — ЕДИНСТВЕННОЕ место, где задаются цена и тексты.
// Цена для ЮKassa берётся только отсюда по ключу продукта: клиент присылает
// лишь ключ и подменить сумму не может.
// Надпись с ценой на странице считается из того же value (см. formatPrice),
// поэтому цифра на странице и сумма в чеке не могут разойтись.
//
// Чтобы добавить услугу: допиши запись сюда и создай страницу
// src/app/<путь>/pay/page.tsx в три строки по образцу существующих.

export type Product = {
  /** Сумма для ЮKassa, строкой с копейками. Единственное место, где задана цена. */
  value: string
  /** Заголовок на странице оплаты */
  payTitle: string
  /** Длительность услуги: «1.5 часа». Пустая — не выводится. */
  duration: string
  /** Формат: «онлайн». Пустой — не выводится. */
  delivery: string
  /** Короткое описание услуги под заголовком */
  blurb: string
  /** Описание платежа в ЮKassa */
  description: string
  /** Строка в фискальном чеке */
  itemDescription: string
  /** Куда вернуть человека после успешной оплаты */
  successPath: string
  /** Договор оферты для этой услуги */
  offerPath: string
  /** Как услуга называется в уведомлении в Telegram */
  notifyName: string
}

export const PRODUCTS: Record<string, Product> = {
  consult: {
    value: '15000.00',
    payTitle: 'Оплата консультации',
    duration: '1.5 часа',
    delivery: 'онлайн',
    blurb: 'Разберёмся, зачем тебе блог. Уйдёшь с ясностью, темами и планом.',
    description: 'Консультация по блогу (1.5 часа)',
    itemDescription: 'Консультация по развитию блога',
    successPath: '/consult/success',
    offerPath: '/offer',
    notifyName: 'Консультация по блогу',
  },
  turnkey: {
    value: '30000.00',
    payTitle: 'Блог под ключ за 3 дня',
    duration: '',
    delivery: '',
    blurb: 'Стратегия блога под твою жизнь и бизнес. Первый ролик под ключ — со сценарием и монтажом.',
    description: 'Блог под ключ за 3 дня',
    itemDescription: 'Блог под ключ за 3 дня',
    successPath: '/pod-kluch/success',
    offerPath: '/offer',
    notifyName: 'Блог под ключ за 3 дня',
  },
  founders: {
    value: '69900.00',
    payTitle: 'Сериал Основателя',
    duration: 'личное сопровождение',
    delivery: '',
    blurb: 'Лично помогаю внедрить блог в твою жизнь и превратить его в актив.',
    description: 'Сериал Основателя — личное сопровождение по внедрению блога',
    itemDescription: 'Сериал Основателя (личное сопровождение)',
    successPath: '/founders/success',
    offerPath: '/founders/offer',
    notifyName: 'Сериал Основателя',
  },
}

export const DEFAULT_PRODUCT = 'consult'

/** '15000.00' → '15 000 ₽'. Без Intl, чтобы результат не зависел от сборки. */
export function formatPrice(value: string): string {
  const rubles = Math.round(Number(value))
  if (!Number.isFinite(rubles)) return value
  return rubles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
}

/** «1.5 часа · онлайн». Пустая строка, если формат не задан. */
export function metaLine(p: Product): string {
  return [p.duration, p.delivery].filter(Boolean).join(' · ')
}

/** Строка под заголовком страницы оплаты: цена и, если задан, формат услуги. */
export function priceLine(p: Product): string {
  return [formatPrice(p.value), metaLine(p)].filter(Boolean).join(' · ')
}
