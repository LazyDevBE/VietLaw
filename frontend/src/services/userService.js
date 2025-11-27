const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const userService = {
  async updateProfile(name, avatar) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, avatar })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update profile')
    }
    
    return response.json()
  },

  async upgradePlan() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/api/user/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to upgrade plan')
    }
    
    return response.json()
  }
}

export { userService }