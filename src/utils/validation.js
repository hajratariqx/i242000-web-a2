// Checkout form validation. Each rule returns a specific message, or "" when the value is fine.
import { CITIES } from '../data/products.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Pakistani mobile numbers: 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX or 00923XXXXXXXXX
const PHONE_PATTERN = /^(?:\+92|0092|92|0)3\d{9}$/

export function isValidPakistaniPhone(value) {
  return PHONE_PATTERN.test(String(value).replace(/[\s\-()]/g, ''))
}

export function validateField(name, rawValue) {
  const value = String(rawValue ?? '').trim()
  switch (name) {
    case 'fullName':
      if (!value) return 'Enter your full name.'
      if (value.length < 3) return 'Your name needs at least 3 characters.'
      if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(value)) return 'Use letters only in your name.'
      return ''
    case 'email':
      if (!value) return 'Enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Enter an email like name@example.com.'
      return ''
    case 'phone':
      if (!value) return 'Enter your mobile number.'
      if (!isValidPakistaniPhone(value)) return 'Enter a Pakistani mobile number like 0300 1234567 or +92 300 1234567.'
      return ''
    case 'city':
      if (!value) return 'Select your city.'
      if (!CITIES.includes(value)) return 'Select a city from the list.'
      return ''
    case 'address':
      if (!value) return 'Enter your delivery address.'
      if (value.length < 10) return 'Add more detail: house, street and area (at least 10 characters).'
      return ''
    case 'notes':
      return value.length > 200 ? 'Keep delivery notes under 200 characters.' : ''
    default:
      return ''
  }
}

export const CHECKOUT_FIELDS = ['fullName', 'email', 'phone', 'city', 'address', 'notes']

// Returns an object like { email: "message" } containing only the fields that have errors.
export function validateCheckout(values) {
  const errors = {}
  CHECKOUT_FIELDS.forEach((name) => {
    const message = validateField(name, values[name])
    if (message) errors[name] = message
  })
  return errors
}
