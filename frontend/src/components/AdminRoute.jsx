import { Navigate } from 'react-router-dom'
import { authService } from '../services/authService'

function AdminRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated()
  const isAdmin = authService.isAdmin()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  if (!isAdmin) {
    return <Navigate to="/chat" />
  }
  
  return children
}

export default AdminRoute