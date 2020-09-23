import { getAction, postAction, patchAction } from './api'

export const login = data => postAction('/app/v1_0/authorizations', data)

export const sendSms = ({ mobile }) =>
  getAction(`/app/v1_0/sms/codes/${mobile}`)

export const getUserSelf = () => getAction('/app/v1_0/user')

export const getUserChannel = () => getAction('/app/v1_0/user/channels')

export const getUserProfile = () => getAction('/app/v1_0/user/profile')

export const updateUser = params =>
  patchAction('/app/v1_0/user/profile', params)

export const updateUserAvatar = params =>
  patchAction('/app/v1_0/user/photo', params)
