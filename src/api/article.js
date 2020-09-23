import request from '@/utils/request'
import { getAction, postAction } from './api'

export const getArticleList = params => getAction('/app/v1_1/articles', params)

export const getArticle = params => getAction(`/app/v1_0/articles/${params.id}`)

export const followUser = params =>
  postAction('/app/v1_0/user/followings', params)

export const unFollowUser = params => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${params.target}`
  })
}

export const collectArticle = params =>
  postAction('/app/v1_0/article/collections', params)

export const unCollectArticle = params => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${params.target}`
  })
}

export const likeArticle = params =>
  postAction('/app/v1_0/article/likings', params)

export const unLikeArticle = params => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${params.target}`
  })
}

export const getComment = params => getAction('/app/v1_0/comments', params)

export const likeComment = params =>
  postAction('/app/v1_0/comment/likings', params)

export const unLikeComment = params => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${params.target}`
  })
}

export const postComment = params => postAction('/app/v1_0/comments', params)
