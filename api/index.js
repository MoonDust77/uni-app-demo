import fetch from './fetch'
export const commonApi = {
  getCategory() {
    return fetch('/api/v1/discovery/channel/list')
  },
  getList(params) {
    return fetch('/api/v1/discovery/article/list', params, 'POST')
  },
  getArticleDetail(articleID) {
    return fetch(`/api/v1/discovery/article/detail/-1/${articleID}`)
  },
  getAuthorDetail(params) {
    return fetch('/api/v1/discovery/author/detail', params, 'POST')
  },
}

export const host = {
  imgHost: 'https://www.papago.com.cn',
}
