import { HTTP_STATUS } from '../constants'
import { notificationService } from '../services/notificationService'

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export const handleApiError = (error, customMessages = {}) => {
  console.error('API Error:', error)

  let message = 'Đã xảy ra lỗi không xác định'
  
  if (error.response) {
    const { status, data } = error.response
    
    // Use custom message if provided
    if (customMessages[status]) {
      message = customMessages[status]
    } else if (data?.message) {
      message = data.message
    } else {
      // Default messages based on status code
      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          message = 'Dữ liệu không hợp lệ'
          break
        case HTTP_STATUS.UNAUTHORIZED:
          message = 'Bạn cần đăng nhập để thực hiện thao tác này'
          break
        case HTTP_STATUS.FORBIDDEN:
          message = 'Bạn không có quyền thực hiện thao tác này'
          break
        case HTTP_STATUS.NOT_FOUND:
          message = 'Không tìm thấy dữ liệu yêu cầu'
          break
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          message = 'Lỗi máy chủ, vui lòng thử lại sau'
          break
        default:
          message = `Lỗi ${status}: ${data?.message || 'Không xác định'}`
      }
    }
    
    throw new ApiError(message, status, data?.code)
  } else if (error.request) {
    message = 'Không thể kết nối đến máy chủ'
    throw new ApiError(message, 0, 'NETWORK_ERROR')
  } else {
    message = error.message || 'Đã xảy ra lỗi không xác định'
    throw new ApiError(message, 0, 'UNKNOWN_ERROR')
  }
}

export const withErrorHandling = (apiCall, customMessages = {}) => {
  return async (...args) => {
    try {
      return await apiCall(...args)
    } catch (error) {
      handleApiError(error, customMessages)
    }
  }
}

export const showErrorNotification = (error, fallbackMessage = 'Đã xảy ra lỗi') => {
  const message = error instanceof ApiError ? error.message : fallbackMessage
  notificationService.error(message)
}

// Utility to handle common async operations with loading and error states
export const withAsyncHandler = (asyncFn, options = {}) => {
  const {
    onStart,
    onSuccess,
    onError,
    showSuccessNotification = false,
    showErrorNotification = true,
    successMessage = 'Thao tác thành công',
    customErrorMessages = {}
  } = options

  return async (...args) => {
    try {
      if (onStart) onStart()
      
      const result = await asyncFn(...args)
      
      if (onSuccess) onSuccess(result)
      if (showSuccessNotification) {
        notificationService.success(successMessage)
      }
      
      return result
    } catch (error) {
      const handledError = handleApiError(error, customErrorMessages)
      
      if (onError) onError(handledError)
      if (showErrorNotification) {
        showErrorNotification(handledError)
      }
      
      throw handledError
    }
  }
}