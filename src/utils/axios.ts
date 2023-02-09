import axios from 'axios'

const VueAxios = axios.create({
  timeout: 3000 * 10,
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

VueAxios.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

VueAxios.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default VueAxios
