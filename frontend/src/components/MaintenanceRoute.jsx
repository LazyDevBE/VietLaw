import { Navigate } from 'react-router-dom'

/**
 * Component để wrap các route đang trong quá trình phát triển
 * Sẽ redirect về trang maintenance thay vì hiển thị trang chưa hoàn thành
 */
function MaintenanceRoute({ children, isUnderMaintenance = true, maintenanceMessage }) {
  if (isUnderMaintenance) {
    return <Navigate to="/maintenance" replace state={{ message: maintenanceMessage }} />
  }

  return children
}

export default MaintenanceRoute