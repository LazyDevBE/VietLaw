import { useState } from 'react'

function FloatingLabelInput({ 
  type = 'text', 
  value, 
  onChange, 
  label, 
  required = false,
  minLength,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition peer"
        placeholder=" "
        required={required}
        minLength={minLength}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${isFocused || hasValue 
            ? 'top-2 text-xs text-blue-600 font-medium' 
            : 'top-4 text-base text-gray-500'
          }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
}

export default FloatingLabelInput
