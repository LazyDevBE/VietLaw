import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import ChatPage from './views/ChatPage'
import ProfilePage from './views/ProfilePage'
import LawPage from './views/LawPage'
import LawDetailPage from './views/LawDetailPage'
import PricingPage from './views/PricingPage'
import AboutPage from './views/AboutPage'
import MaintenancePage from './views/MaintenancePage'
import NotFoundPage from './views/NotFoundPage'
import AdminPage from './views/AdminPage'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import MaintenanceRoute from './components/MaintenanceRoute'
import ScrollToTop from './components/ScrollToTop'
import { isPageUnderMaintenance, getMaintenanceMessage } from './utils/maintenanceConfig'

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Maintenance Page */}
          <Route path="/maintenance" element={<MaintenancePage />} />
          
          {/* Pages Under Development */}
          <Route path="/about" element={
            <MaintenanceRoute 
              isUnderMaintenance={isPageUnderMaintenance('about')} 
              maintenanceMessage={getMaintenanceMessage('about')}
            >
              <AboutPage />
            </MaintenanceRoute>
          } />
          
          <Route path="/pricing" element={
            <MaintenanceRoute 
              isUnderMaintenance={isPageUnderMaintenance('pricing')} 
              maintenanceMessage={getMaintenanceMessage('pricing')}
            >
              <PricingPage />
            </MaintenanceRoute>
          } />
          
          <Route path="/law" element={
            <MaintenanceRoute 
              isUnderMaintenance={isPageUnderMaintenance('law')} 
              maintenanceMessage={getMaintenanceMessage('law')}
            >
              <LawPage />
            </MaintenanceRoute>
          } />
          
          <Route path="/law/:slug" element={
            <MaintenanceRoute 
              isUnderMaintenance={isPageUnderMaintenance('lawDetail')} 
              maintenanceMessage={getMaintenanceMessage('lawDetail')}
            >
              <LawDetailPage />
            </MaintenanceRoute>
          } />
          
          {/* Protected Routes - Working */}
          <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          
          {/* Protected Routes - Under Development */}
          <Route path="/profile" element={
            <PrivateRoute>
              <MaintenanceRoute 
                isUnderMaintenance={isPageUnderMaintenance('profile')} 
                maintenanceMessage={getMaintenanceMessage('profile')}
              >
                <ProfilePage />
              </MaintenanceRoute>
            </PrivateRoute>
          } />
          
          {/* 404 - Catch all unmatched routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
