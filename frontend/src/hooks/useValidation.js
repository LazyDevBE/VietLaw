import { useState, useCallback } from 'react'
import { emailValidator } from '../utils/emailValidator'
import { phoneValidator } from '../utils/phoneValidator'

export const useEmailValidation = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const [validation, setValidation] = useState({ isValid: true, errors: [], warnings: [], suggestion: null })

  const validate = useCallback((email) => {
    if (!email || !email.trim()) {
      setValidation({ isValid: true, errors: [], warnings: [], suggestion: null })
      return
    }

    const result = emailValidator.validate(email)
    setValidation(result)
  }, [])

  const handleChange = useCallback((newValue) => {
    setValue(newValue)
    validate(newValue)
  }, [validate])

  const reset = useCallback(() => {
    setValue('')
    setValidation({ isValid: true, errors: [], warnings: [], suggestion: null })
  }, [])

  return {
    value,
    validation,
    setValue: handleChange,
    reset,
    isValid: validation.isValid
  }
}

export const usePhoneValidation = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const [validation, setValidation] = useState({ isValid: true, errors: [], warnings: [], info: null })

  const validate = useCallback((phone) => {
    if (!phone || !phone.trim()) {
      setValidation({ isValid: true, errors: [], warnings: [], info: null })
      return
    }

    const result = phoneValidator.validate(phone)
    setValidation(result)
  }, [])

  const handleChange = useCallback((newValue) => {
    setValue(newValue)
    validate(newValue)
  }, [validate])

  const reset = useCallback(() => {
    setValue('')
    setValidation({ isValid: true, errors: [], warnings: [], info: null })
  }, [])

  return {
    value,
    validation,
    setValue: handleChange,
    reset,
    isValid: validation.isValid
  }
}

export const useFormValidation = (initialValues = {}, validators = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = useCallback((name, value) => {
    const validator = validators[name]
    if (!validator) return null

    return validator(value)
  }, [validators])

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validateField])

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, values[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [values, validateField])

  const validateAll = useCallback(() => {
    const newErrors = {}
    let isValid = true

    Object.keys(validators).forEach(name => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouched(Object.keys(validators).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    
    return isValid
  }, [values, validators, validateField])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  }
}