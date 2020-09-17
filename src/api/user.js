import request from '@/utils/request'

const postAction = (url, data) => {
  return request({
    method: 'POST',
    url,
    data
  })
}

const getAction = (url, data) => {
  return request({
    method: 'GET',
    url,
    data
  })
}

export const login = data => postAction('/app/v1_0/authorizations', data)

export const sendSms = ({ mobile }) =>
  getAction(`/app/v1_0/sms/codes/${mobile}`)
