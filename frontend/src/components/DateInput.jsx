import { useState } from 'react'

function DateInput({ 
  value, 
  onChange, 
  label, 
  required = false,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        required={required}
        {...props}
      />
      <label className="absolute left-4 top-2 text-xs text-blue-600 font-medium pointer-events-none">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
}

export default DateInput