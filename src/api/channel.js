import { getAction, patchAction, deleteAction } from './api'

export const getAllChannelList = () => getAction('/app/v1_0/channels')

export const updateUserChannel = params =>
  patchAction('/app/v1_0/user/channels', params)

export const deleteUserChannel = params =>
  deleteAction('/app/v1_0/user/channels', params)
