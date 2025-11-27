import { useState, useEffect } from 'react'

function EmailInput({ 
  value, 
  onChange, 
  onValidation,
  label = "Email", 
  required = false,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [validation, setValidation] = useState({ isValid: true, errors: [], warnings: [], suggestion: null })
  const [showSuggestion, setShowSuggestion] = useState(false)
  
  const hasValue = value && value.length > 0

  useEffect(() => {
    if (value && value.trim()) {
      const result = emailValidator.validate(value)
      setValidation(result)
      setShowSuggestion(!!result.suggestion)
      
      if (onValidation) {
        onValidation(result)
      }
    } else {
      setValidation({ isValid: true, errors: [], warnings: [], suggestion: null })
      setShowSuggestion(false)
      if (onValidation) {
        onValidation({ isValid: true, errors: [], warnings: [], suggestion: null })
      }
    }
  }, [value, onValidation])

  const handleSuggestionClick = () => {
    if (validation.suggestion) {
      onChange({ target: { value: validation.suggestion } })
      setShowSuggestion(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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

      {/* Warning Messages */}
      {validation.warnings.length > 0 && (
        <div className="space-y-1">
          {validation.warnings.map((warning, index) => (
            <p key={index} className="text-yellow-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {warning}
            </p>
          ))}
        </div>
      )}

      {/* Email Suggestion */}
      {showSuggestion && validation.suggestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm mb-2">
            Có phải bạn muốn nhập: 
            <button
              type="button"
              onClick={handleSuggestionClick}
              className="font-semibold text-blue-600 hover:text-blue-800 underline ml-1"
            >
              {validation.suggestion}
            </button>
            ?
          </p>
          <button
            type="button"
            onClick={() => setShowSuggestion(false)}
            className="text-blue-600 text-xs hover:text-blue-800"
          >
            Bỏ qua
          </button>
        </div>
      )}
    </div>
  )
}

export default EmailInput