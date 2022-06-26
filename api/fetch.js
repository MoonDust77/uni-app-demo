const urlHost = 'https://www.papago.com.cn'
function fetch(url = '', params = {}, method = 'GET', type = 'formData') {
  method = method.toUpperCase()
  let header = {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: urlHost + url,
      method: method,
      data: params,
      header: header,
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          resolve(response.data)
        } else {
          uni.showToast({
            title: response.statusCode,
          })
        }
      },
      fail: (err) => {
        reject(err)
        uni.showToast({
          title: err + ':' + url,
        })
      },
    })
  })
}

export default fetch
