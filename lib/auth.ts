export function sanitizeText(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

export function sanitizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function sanitizePhone(value: string) {
  return value.replace(/[^+\d]/g, "")
}

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validatePassword(value: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(value)
}

export function validateName(value: string) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/.test(value)
}

export function validatePhone(value: string) {
  return /^\+?\d{7,15}$/.test(value)
}

export function validateLocation(value: string) {
  return /^[A-Za-z0-9À-ÖØ-öø-ÿ'.,\s-]{2,60}$/.test(value)
}
