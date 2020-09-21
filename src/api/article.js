import { getAction } from './api'

export const getArticle = params => getAction('/app/v1_1/articles', params)
