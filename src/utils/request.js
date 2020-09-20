import { USER_KEY } from '@/utils/constants'
import axios from 'axios'
import { getItem } from './storage'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(
  config => {
    const user = getItem(USER_KEY)
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

export default request
