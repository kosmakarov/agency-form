# Анкета предзаписи — Бутиковое агентство

Красивая веб-страница анкеты с отправкой заявок в Telegram.

## Быстрый старт

### 1. Установить зависимости

```bash
cd agency-form
npm install
```

### 2. Настроить Telegram

Откройте файл `.env.local` и проверьте настройки:

```
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=@ваш_username_или_chat_id
```

**Важно:** Чтобы бот мог отправлять сообщения:
- Если указываете `@username` — сначала напишите боту `/start`
- Если хотите получать в группу — добавьте бота в группу и используйте chat_id группы

### 3. Запустить локально

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### 4. Деплой на Vercel (бесплатно)

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)

2. Установите Vercel CLI:
```bash
npm install -g vercel
```

3. Задеплойте:
```bash
vercel
```

4. Добавьте переменные окружения в Vercel Dashboard:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

Готово! Ваша анкета доступна по ссылке от Vercel.

## Структура проекта

```
agency-form/
├── src/
│   └── app/
│       ├── page.tsx          # Главная страница с анкетой
│       ├── thanks/
│       │   └── page.tsx      # Страница благодарности
│       ├── api/
│       │   └── lead/
│       │       └── route.ts  # API для отправки в Telegram
│       ├── layout.tsx        # Общий layout
│       └── globals.css       # Стили
├── .env.local                # Секреты (не коммитить!)
├── tailwind.config.ts        # Настройки Tailwind
└── package.json
```

## Как получить Chat ID

Если бот должен писать лично вам:
1. Найдите бота `@userinfobot` в Telegram
2. Напишите ему `/start`
3. Он покажет ваш Chat ID (число)

Если бот должен писать в группу:
1. Добавьте бота в группу
2. Добавьте бота `@RawDataBot` в группу
3. Он покажет `chat.id` группы (отрицательное число)
4. Удалите `@RawDataBot`

## Кастомизация

### Изменить цвета
Отредактируйте `tailwind.config.ts` — секция `colors.forest` и `colors.ivory`

### Изменить тексты
Отредактируйте `src/app/page.tsx` — заголовки, подписи, placeholder'ы

### Изменить поля
Отредактируйте `src/app/page.tsx` — добавьте/удалите поля в форме и в `FormData` interface
