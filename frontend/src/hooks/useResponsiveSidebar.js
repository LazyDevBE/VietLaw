import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '../constants'

export function useResponsiveSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < BREAKPOINTS.MD)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < BREAKPOINTS.MD) {
        setSidebarCollapsed(true)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const closeSidebar = () => {
    setSidebarCollapsed(true)
  }

  return {
    sidebarCollapsed,
    toggleSidebar,
    closeSidebar
  }
}