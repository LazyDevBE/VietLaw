import { VALIDATION } from '../constants'

// Vietnamese mobile network operators
const NETWORK_OPERATORS = {
  VIETTEL: {
    name: 'Viettel',
    prefixes: ['032', '033', '034', '035', '036', '037', '038', '039', '086', '096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169']
  },
  VINAPHONE: {
    name: 'VinaPhone',
    prefixes: ['081', '082', '083', '084', '085', '088', '091', '094', '0123', '0124', '0125', '0127', '0129']
  },
  MOBIFONE: {
    name: 'MobiFone',
    prefixes: ['070', '076', '077', '078', '079', '089', '090', '093', '0120', '0121', '0122', '0126', '0128']
  },
  VIETNAMOBILE: {
    name: 'Vietnamobile',
    prefixes: ['092', '056', '058', '0186', '0188']
  },
  GMOBILE: {
    name: 'Gmobile',
    prefixes: ['099', '0199']
  }
}

// Format phone number to standard format
function formatPhoneNumber(phone) {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')
  
  // Handle international format (+84)
  if (cleaned.startsWith('84')) {
    cleaned = '0' + cleaned.substring(2)
  }
  
  return cleaned
}

// Detect network operator
function detectOperator(phone) {
  const formatted = formatPhoneNumber(phone)
  
  for (const [key, operator] of Object.entries(NETWORK_OPERATORS)) {
    for (const prefix of operator.prefixes) {
      if (formatted.startsWith(prefix)) {
        return operator.name
      }
    }
  }
  
  return null
}

// Validate phone number length based on prefix
function validateLength(phone) {
  const formatted = formatPhoneNumber(phone)
  
  // 11-digit numbers (old format)
  if (formatted.length === 11) {
    const oldPrefixes = ['0120', '0121', '0122', '0123', '0124', '0125', '0126', '0127', '0128', '0129', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', '0186', '0188', '0199']
    return oldPrefixes.some(prefix => formatted.startsWith(prefix))
  }
  
  // 10-digit numbers (new format)
  if (formatted.length === 10) {
    return true
  }
  
  return false
}

export const phoneValidator = {
  validate(phone) {
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      info: null
    }

    if (!phone || !phone.trim()) {
      return result
    }

    const trimmedPhone = phone.trim()
    const formatted = formatPhoneNumber(trimmedPhone)

    // Basic format validation using regex
    if (!VALIDATION.PHONE_REGEX.test(formatted)) {
      result.isValid = false
      result.errors.push('Số điện thoại không đúng định dạng')
      return result
    }

    // Length validation
    if (!validateLength(formatted)) {
      result.isValid = false
      result.errors.push('Số điện thoại không đúng độ dài')
      return result
    }

    // Must start with 0
    if (!formatted.startsWith('0')) {
      result.isValid = false
      result.errors.push('Số điện thoại phải bắt đầu bằng số 0')
      return result
    }

    if (result.isValid) {
      // Detect network operator
      const operator = detectOperator(formatted)
      if (operator) {
        result.info = `Nhà mạng: ${operator}`
      }

      // Check for old format numbers
      if (formatted.length === 11) {
        result.warnings.push('Đây là số điện thoại định dạng cũ (11 số)')
      }

      // Check for suspicious patterns
      if (/^0+$/.test(formatted.substring(1))) {
        result.isValid = false
        result.errors.push('Số điện thoại không hợp lệ')
      }

      // Check for repeated digits (more than 4 consecutive)
      if (/(\d)\1{4,}/.test(formatted)) {
        result.warnings.push('Số điện thoại chứa nhiều chữ số giống nhau liên tiếp')
      }

      // Check for sequential numbers
      const hasSequential = /01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321|43210/.test(formatted)
      if (hasSequential) {
        result.warnings.push('Số điện thoại chứa dãy số liên tiếp')
      }
    }

    return result
  },

  format(phone) {
    if (!phone) return ''
    
    const formatted = formatPhoneNumber(phone)
    
    if (formatted.length === 10) {
      // Format: 0xxx xxx xxx
      return `${formatted.substring(0, 4)} ${formatted.substring(4, 7)} ${formatted.substring(7)}`
    } else if (formatted.length === 11) {
      // Format: 0xxxx xxx xxx
      return `${formatted.substring(0, 5)} ${formatted.substring(5, 8)} ${formatted.substring(8)}`
    }
    
    return formatted
  }
}