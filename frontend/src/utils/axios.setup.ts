import { updateAccessToken } from '@/services/redux/auth'
import store from '@/services/redux/store'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Req Interceptor - añadir token automaticamente
axios.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.userToken
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// Res Interceptor - manejar refesh automatico
axios.interceptors.response.use((response) => {
  const newToken = response.headers['x-new-access-token'] // siempre en lowercase
  if (newToken) {
    store.dispatch(updateAccessToken(newToken))
  }
  return response
})
