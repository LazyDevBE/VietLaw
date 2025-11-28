import { VALIDATION } from '../constants'

// Common email domain suggestions
const COMMON_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'aol.com',
  'protonmail.com',
  'zoho.com'
]

// Vietnamese email providers
const VIETNAMESE_DOMAINS = [
  'viettel.vn',
  'vnpt.vn',
  'fpt.com.vn',
  'tma.com.vn',
  'vng.com.vn'
]

// Calculate string similarity using Levenshtein distance
function calculateSimilarity(str1, str2) {
  const matrix = []
  const len1 = str1.length
  const len2 = str2.length

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  const distance = matrix[len2][len1]
  const maxLength = Math.max(len1, len2)
  return (maxLength - distance) / maxLength
}

// Find the best domain suggestion
function findDomainSuggestion(domain) {
  const allDomains = [...COMMON_DOMAINS, ...VIETNAMESE_DOMAINS]
  let bestMatch = null
  let bestSimilarity = 0

  for (const suggestedDomain of allDomains) {
    const similarity = calculateSimilarity(domain.toLowerCase(), suggestedDomain)
    if (similarity > bestSimilarity && similarity > 0.6) {
      bestSimilarity = similarity
      bestMatch = suggestedDomain
    }
  }

  return bestMatch
}

export const emailValidator = {
  validate(email) {
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestion: null
    }

    if (!email || !email.trim()) {
      return result
    }

    const trimmedEmail = email.trim()

    // Basic format validation
    if (!VALIDATION.EMAIL_REGEX.test(trimmedEmail)) {
      result.isValid = false
      result.errors.push('Định dạng email không hợp lệ')
      return result
    }

    // Split email into local and domain parts
    const [localPart, domainPart] = trimmedEmail.split('@')

    // Validate local part
    if (localPart.length > 64) {
      result.isValid = false
      result.errors.push('Phần tên người dùng quá dài (tối đa 64 ký tự)')
    }

    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      result.isValid = false
      result.errors.push('Email không được bắt đầu hoặc kết thúc bằng dấu chấm')
    }

    if (localPart.includes('..')) {
      result.isValid = false
      result.errors.push('Email không được chứa hai dấu chấm liên tiếp')
    }

    // Validate domain part
    if (domainPart.length > 253) {
      result.isValid = false
      result.errors.push('Tên miền quá dài')
    }

    if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
      result.isValid = false
      result.errors.push('Tên miền không hợp lệ')
    }

    // Check for common typos and suggest corrections
    if (result.isValid) {
      const suggestion = findDomainSuggestion(domainPart)
      if (suggestion && suggestion !== domainPart) {
        result.suggestion = `${localPart}@${suggestion}`
      }

      // Additional warnings for best practices
      if (localPart.length < 3) {
        result.warnings.push('Tên người dùng khá ngắn, hãy đảm bảo đây là email chính xác')
      }

      if (trimmedEmail.length > 100) {
        result.warnings.push('Email khá dài, hãy kiểm tra lại')
      }

      // Check for suspicious patterns
      if (/\d{4,}/.test(localPart)) {
        result.warnings.push('Email chứa nhiều số, hãy đảm bảo đây là email chính xác')
      }
    }

    return result
  }
}