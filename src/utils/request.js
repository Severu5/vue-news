import axios from 'axios'
import { getItem } from './storage'
import store from '@/store'
import { USER_KEY } from '@/utils/constants'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const refreshTokenRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        return data
      }
    }
  ]
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
  async error => {
    const status = error.response.status
    if (status === 400) {
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      const user = getItem(USER_KEY)
      if (!user || !user.token) {
        return redirectLogin()
      }
      try {
        const { data } = await refreshTokenRequest({
          method: 'put',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        store.commit('setUser', {
          ...user,
          token: data.data.token // 最新获取的可用 token
        })
        return request(error.config)
      } catch (err) {
        return redirectLogin()
      }
    } else if (status === 403) {
      Toast.fail('没有权限操作')
    } else if (status >= 500) {
      Toast.fail('服务端异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
