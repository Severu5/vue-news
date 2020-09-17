import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

export default request
