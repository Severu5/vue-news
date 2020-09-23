import request from '@/utils/request'
import { getAction } from './api'

export const getSuggestion = params => getAction('/app/v1_0/suggestion', params)

export const getSearch = params => getAction('/app/v1_0/search', params)

export const getHistory = () => getAction('/app/v1_0/search/histories')

export const deleteHistory = () => {
  return request({
    method: 'delete',
    url: '/app/v1_0/search/histories'
  })
}
