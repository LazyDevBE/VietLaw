const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const lawService = {
  async getAllLaws(keyword = '') {
    const token = localStorage.getItem('token')
    const url = keyword 
      ? `${API_URL}/laws?keyword=${encodeURIComponent(keyword)}`
      : `${API_URL}/laws`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch laws')
    }
    
    return response.json()
  },

  async getLawBySlug(slug) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/laws/${slug}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch law details')
    }
    
    return response.json()
  }
}

export { lawService }