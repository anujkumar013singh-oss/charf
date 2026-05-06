import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitContact = async (data) => {
  try {
    const response = await api.post('/contact', data)
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Something went wrong' }
  }
}

export const searchCertificate = async (certNumber) => {
  try {
    const response = await api.get(`/search?cert=${encodeURIComponent(certNumber)}`)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return { found: false }
    }
    throw error.response?.data || { error: 'Search failed' }
  }
}

export default api
