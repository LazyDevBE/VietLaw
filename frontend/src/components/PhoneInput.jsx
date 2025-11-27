import { useState, useEffect } from 'react'

function PhoneInput({ 
  value, 
  onChange, 
  onValidation,
  label = "Số điện thoại", 
  required = false,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [validation, setValidation] = useState({ isValid: true, errors: [], warnings: [], info: null })
  const [displayValue, setDisplayValue] = useState(value || '')
  
  const hasValue = displayValue && displayValue.length > 0

  useEffect(() => {
    if (value && value.trim()) {
      const result = phoneValidator.validate(value)
      setValidation(result)
      
      if (onValidation) {
        onValidation(result)
      }
    } else {
      setValidation({ isValid: true, errors: [], warnings: [], info: null })
      if (onValidation) {
        onValidation({ isValid: true, errors: [], warnings: [], info: null })
      }
    }
  }, [value, onValidation])

  const handleChange = (e) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    
    // Chỉ cho phép nhập số và dấu +
    const cleanValue = inputValue.replace(/[^\d\+]/g, '')
    
    if (onChange) {
      onChange({ target: { value: cleanValue } })
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Format lại khi blur nếu hợp lệ
    if (validation.isValid && value) {
      const formatted = phoneValidator.format(value)
      setDisplayValue(formatted)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="tel"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition peer ${
            validation.errors.length > 0 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-blue-500 focus:ring-blue-200'
          }`}
          placeholder=" "
          required={required}
          {...props}
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isFocused || hasValue 
              ? 'top-2 text-xs font-medium' 
              : 'top-4 text-base text-gray-500'
          } ${
            validation.errors.length > 0 
              ? 'text-red-600' 
              : isFocused ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {/* Validation Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {value && validation.isValid && validation.errors.length === 0 && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          
          {value && validation.errors.length > 0 && (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </div>

      {/* Error Messages */}
      {validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((error, index) => (
            <p key={index} className="text-red-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Info Messages (Carrier info) */}
      {validation.info && (
        <p className="text-blue-600 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {validation.info}
        </p>
      )}
    </div>
  )
}

export default PhoneInput