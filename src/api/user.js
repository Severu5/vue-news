import { getAction, postAction } from './api'

export const login = data => postAction('/app/v1_0/authorizations', data)

export const sendSms = ({ mobile }) =>
  getAction(`/app/v1_0/sms/codes/${mobile}`)

export const getUserSelf = () => getAction('/app/v1_0/user')

export const getUserChannel = () => getAction('/app/v1_0/user/channels')
