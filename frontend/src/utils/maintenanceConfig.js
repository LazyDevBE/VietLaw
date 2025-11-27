// Maintenance Configuration
// Cấu hình trang nào đang bảo trì

const maintenancePages = {
  about: {
    isUnderMaintenance: false,
    message: 'Trang Giới thiệu đang được cập nhật. Vui lòng quay lại sau!'
  },
  pricing: {
    isUnderMaintenance: false,
    message: 'Trang Bảng giá đang được cập nhật. Vui lòng quay lại sau!'
  },
  law: {
    isUnderMaintenance: false,
    message: 'Trang Tra cứu luật đang được phát triển. Vui lòng quay lại sau!'
  },
  lawDetail: {
    isUnderMaintenance: false,
    message: 'Chi tiết văn bản luật đang được phát triển. Vui lòng quay lại sau!'
  },
  profile: {
    isUnderMaintenance: false,
    message: 'Trang Hồ sơ cá nhân đang được cập nhật. Vui lòng quay lại sau!'
  }
}

export const isPageUnderMaintenance = (pageName) => {
  return maintenancePages[pageName]?.isUnderMaintenance || false
}

export const getMaintenanceMessage = (pageName) => {
  return maintenancePages[pageName]?.message || 'Trang này đang được bảo trì. Vui lòng quay lại sau!'
}

// Utility để bật/tắt maintenance cho một trang
export const setPageMaintenance = (pageName, isUnderMaintenance, customMessage = null) => {
  if (maintenancePages[pageName]) {
    maintenancePages[pageName].isUnderMaintenance = isUnderMaintenance
    if (customMessage) {
      maintenancePages[pageName].message = customMessage
    }
  }
}

// Utility để kiểm tra tất cả trang đang bảo trì
export const getAllMaintenancePages = () => {
  return Object.entries(maintenancePages)
    .filter(([_, config]) => config.isUnderMaintenance)
    .map(([pageName, config]) => ({ pageName, ...config }))
}