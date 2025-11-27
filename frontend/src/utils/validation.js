import { useState } from 'react'
import { VALIDATION } from '../constants'

export class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

export const validators = {
  email: (value) => {
    if (!value) return { isValid: false, message: 'Email là bắt buộc' }
    if (!VALIDATION.EMAIL_REGEX.test(value)) {
      return { isValid: false, message: 'Email không hợp lệ' }
    }
    return { isValid: true }
  },

  phone: (value) => {
    if (!value) return { isValid: false, message: 'Số điện thoại là bắt buộc' }
    if (!VALIDATION.PHONE_REGEX.test(value)) {
      return { isValid: false, message: 'Số điện thoại không hợp lệ' }
    }
    return { isValid: true }
  },

  password: (value) => {
    if (!value) return { isValid: false, message: 'Mật khẩu là bắt buộc' }
    if (value.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      return { 
        isValid: false, 
        message: `Mật khẩu phải có ít nhất ${VALIDATION.MIN_PASSWORD_LENGTH} ký tự` 
      }
    }
    if (value.length > VALIDATION.MAX_PASSWORD_LENGTH) {
      return { 
        isValid: false, 
        message: `Mật khẩu không được vượt quá ${VALIDATION.MAX_PASSWORD_LENGTH} ký tự` 
      }
    }
    return { isValid: true }
  },

  required: (value, fieldName = 'Trường này') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return { isValid: false, message: `${fieldName} là bắt buộc` }
    }
    return { isValid: true }
  },

  minLength: (value, min, fieldName = 'Trường này') => {
    if (!value || value.length < min) {
      return { 
        isValid: false, 
        message: `${fieldName} phải có ít nhất ${min} ký tự` 
      }
    }
    return { isValid: true }
  },

  maxLength: (value, max, fieldName = 'Trường này') => {
    if (value && value.length > max) {
      return { 
        isValid: false, 
        message: `${fieldName} không được vượt quá ${max} ký tự` 
      }
    }
    return { isValid: true }
  }
}

export const validateForm = (data, rules) => {
  const errors = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field]
    
    for (const rule of fieldRules) {
      const result = rule(value)
      if (!result.isValid) {
        errors[field] = result.message
        isValid = false
        break // Stop at first error for this field
      }
    }
  }

  return { isValid, errors }
}

// Custom hook for form validation
export const useFormValidation = (initialData, rules) => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (field, value) => {
    const fieldRules = rules[field]
    if (!fieldRules) return { isValid: true }

    for (const rule of fieldRules) {
      const result = rule(value)
      if (!result.isValid) {
        return result
      }
    }
    return { isValid: true }
  }

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
    
    if (touched[field]) {
      const validation = validateField(field, value)
      setErrors(prev => ({
        ...prev,
        [field]: validation.isValid ? undefined : validation.message
      }))
    }
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const validation = validateField(field, data[field])
    setErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? undefined : validation.message
    }))
  }

  const validateAll = () => {
    const { isValid, errors: allErrors } = validateForm(data, rules)
    setErrors(allErrors)
    setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    return isValid
  }

  const reset = () => {
    setData(initialData)
    setErrors({})
    setTouched({})
  }

  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  }
}