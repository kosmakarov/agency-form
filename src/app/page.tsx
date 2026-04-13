'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  contact: string
  instagram: string
  business: string
  blogGoal: string
  previousExperience: string
  blogBudget: string
  marketingBudget: string
  successMetric: string
}

interface FormErrors {
  [key: string]: string
}

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    instagram: '',
    business: '',
    blogGoal: '',
    previousExperience: '',
    blogBudget: '',
    marketingBudget: '',
    successMetric: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя'
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Пожалуйста, укажите контакт для связи'
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Пожалуйста, расскажите о вашем бизнесе'
    }

    if (!formData.blogGoal) {
      newErrors.blogGoal = 'Пожалуйста, выберите цель'
    }

    if (!formData.previousExperience.trim()) {
      newErrors.previousExperience = 'Пожалуйста, ответьте на вопрос'
    }

    if (!formData.blogBudget) {
      newErrors.blogBudget = 'Пожалуйста, выберите бюджет'
    }

    if (!formData.marketingBudget) {
      newErrors.marketingBudget = 'Пожалуйста, выберите бюджет'
    }

    if (!formData.successMetric.trim()) {
      newErrors.successMetric = 'Пожалуйста, опишите ожидаемый результат'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thanks')
      } else {
        const data = await response.json()
        setError(data.error || 'Произошла ошибка при отправке. Попробуйте ещё раз.')
      }
    } catch (err) {
      setError('Произошла ошибка при отправке. Проверьте соединение и попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const inputClassName = (fieldName: string) => `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    ${errors[fieldName]
      ? 'border-red-300 bg-red-50 focus:border-red-400'
      : 'border-forest-200 bg-ivory-50 focus:border-forest-400'
    }
    text-forest-900 placeholder-forest-400
  `

  const labelClassName = "block text-forest-800 font-medium mb-2"
  const errorClassName = "text-red-500 text-sm mt-1"
  const hintClassName = "text-forest-500 text-sm mt-1"

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-ivory-100 mb-6">
            Расскажите про свой бизнес
          </h1>
          <p className="text-forest-300 text-lg leading-relaxed max-w-xl mx-auto">
            Заполните за 2 минуты — я пойму контекст и предложу подходящий формат работы.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-ivory-100 rounded-2xl shadow-2xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 1. Имя */}
            <div>
              <label htmlFor="name" className={labelClassName}>
                Имя <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={inputClassName('name')}
                placeholder="Как к вам обращаться"
              />
              {errors.name && <p className={errorClassName}>{errors.name}</p>}
            </div>

            {/* 2. Контакт */}
            <div>
              <label htmlFor="contact" className={labelClassName}>
                Контакт для связи <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                className={inputClassName('contact')}
                placeholder="@username или +7..."
              />
              <p className={hintClassName}>Telegram, WhatsApp или телефон</p>
              {errors.contact && <p className={errorClassName}>{errors.contact}</p>}
            </div>

            {/* 3. Instagram */}
            <div>
              <label htmlFor="instagram" className={labelClassName}>
                Ник в Instagram
              </label>
              <input
                type="text"
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                className={inputClassName('instagram')}
                placeholder="@username"
              />
            </div>

            {/* 4. О бизнесе */}
            <div>
              <label htmlFor="business" className={labelClassName}>
                Коротко про бизнес <span className="text-red-400">*</span>
              </label>
              <textarea
                id="business"
                value={formData.business}
                onChange={(e) => handleInputChange('business', e.target.value)}
                className={inputClassName('business')}
                placeholder="Расскажите в свободной форме"
                rows={3}
              />
              <p className={hintClassName}>Что делаете, для кого, какой примерно оборот</p>
              {errors.business && <p className={errorClassName}>{errors.business}</p>}
            </div>

            {/* 5. Цель блога */}
            <div>
              <label className={labelClassName}>
                Зачем вам блог? <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3 mt-3">
                {[
                  { value: 'клиенты', label: 'Клиенты и заявки' },
                  { value: 'узнаваемость', label: 'Узнаваемость и доверие к бренду' },
                  { value: 'партнёры', label: 'Партнёры и деловые контакты' },
                  { value: 'не понимаю', label: 'Пока не понимаю, но чувствую что надо' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="blogGoal"
                      value={option.value}
                      checked={formData.blogGoal === option.value}
                      onChange={(e) => handleInputChange('blogGoal', e.target.value)}
                    />
                    <span className="text-forest-800 group-hover:text-forest-600 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.blogGoal && <p className={errorClassName}>{errors.blogGoal}</p>}
            </div>

            {/* 6. Предыдущий опыт */}
            <div>
              <label htmlFor="previousExperience" className={labelClassName}>
                Пробовали вести блог раньше? Что не получилось? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="previousExperience"
                value={formData.previousExperience}
                onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                className={inputClassName('previousExperience')}
                placeholder="Расскажите о вашем опыте"
                rows={2}
              />
              <p className={hintClassName}>Если не пробовали — так и напишите</p>
              {errors.previousExperience && <p className={errorClassName}>{errors.previousExperience}</p>}
            </div>

            {/* 7. Бюджет на блог */}
            <div>
              <label className={labelClassName}>
                Сколько готовы инвестировать в развитие блога в месяц? <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3 mt-3">
                {[
                  { value: 'до 50 тыс', label: 'До 50 тыс ₽' },
                  { value: '50-150 тыс', label: '50–150 тыс ₽' },
                  { value: '150-300 тыс', label: '150–300 тыс ₽' },
                  { value: '300+ тыс', label: '300 тыс ₽ и выше' },
                  { value: 'не определился', label: 'Пока не определился' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="blogBudget"
                      value={option.value}
                      checked={formData.blogBudget === option.value}
                      onChange={(e) => handleInputChange('blogBudget', e.target.value)}
                    />
                    <span className="text-forest-800 group-hover:text-forest-600 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.blogBudget && <p className={errorClassName}>{errors.blogBudget}</p>}
            </div>

            {/* 8. Бюджет на маркетинг */}
            <div>
              <label className={labelClassName}>
                Какой у вашей компании месячный бюджет на маркетинг в целом? <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3 mt-3">
                {[
                  { value: 'до 100 тыс', label: 'До 100 тыс ₽' },
                  { value: '100-300 тыс', label: '100–300 тыс ₽' },
                  { value: '300-999 тыс', label: '300–999 тыс ₽' },
                  { value: '1 млн+', label: '1 млн ₽ и выше' },
                  { value: 'нет бюджета', label: 'Пока нет регулярного бюджета' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="marketingBudget"
                      value={option.value}
                      checked={formData.marketingBudget === option.value}
                      onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
                    />
                    <span className="text-forest-800 group-hover:text-forest-600 transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.marketingBudget && <p className={errorClassName}>{errors.marketingBudget}</p>}
            </div>

            {/* 9. Метрика успеха */}
            <div>
              <label htmlFor="successMetric" className={labelClassName}>
                Какой результат через 3 месяца покажет вам, что блог работает? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="successMetric"
                value={formData.successMetric}
                onChange={(e) => handleInputChange('successMetric', e.target.value)}
                className={inputClassName('successMetric')}
                placeholder="Опишите ожидаемый результат"
                rows={3}
              />
              {errors.successMetric && <p className={errorClassName}>{errors.successMetric}</p>}
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 px-6 rounded-xl text-lg font-semibold
                transition-all duration-300 transform
                ${isLoading
                  ? 'bg-forest-400 cursor-not-allowed'
                  : 'bg-forest-700 hover:bg-forest-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }
                text-ivory-50
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Отправляем...
                </span>
              ) : (
                'Отправить'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
