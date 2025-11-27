class NotificationService {
  constructor() {
    this.notifications = []
    this.listeners = []
  }

  // Add a notification
  add(message, type = 'info', duration = 5000) {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
      timestamp: new Date()
    }

    this.notifications.push(notification)
    this.notifyListeners()

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id)
      }, duration)
    }

    return notification.id
  }

  // Remove a notification
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id)
    this.notifyListeners()
  }

  // Clear all notifications
  clear() {
    this.notifications = []
    this.notifyListeners()
  }

  // Get all notifications
  getAll() {
    return [...this.notifications]
  }

  // Subscribe to notification changes
  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(listener => {
      listener(this.notifications)
    })
  }

  // Convenience methods
  success(message, duration) {
    return this.add(message, 'success', duration)
  }

  error(message, duration) {
    return this.add(message, 'error', duration)
  }

  warning(message, duration) {
    return this.add(message, 'warning', duration)
  }

  info(message, duration) {
    return this.add(message, 'info', duration)
  }
}

export const notificationService = new NotificationService()