import request from '@/utils/request'
const postAction = (url, data) => {
  return request({
    method: 'POST',
    url,
    data
  })
}

const getAction = (url, params) => {
  return request({
    method: 'GET',
    url,
    params
  })
}

const patchAction = (url, data) => {
  return request({
    method: 'PATCH',
    url,
    data
  })
}

const deleteAction = (url, params) => {
  return request({
    method: 'DELETE',
    url: url + '/' + params.id
  })
}

export { postAction, getAction, patchAction, deleteAction }
