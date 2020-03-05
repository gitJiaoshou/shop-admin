import axios from 'axios'
/**
 * 封装http请求
 */
class Http {
  /**
   * 初始化操作
   */
  constructor () {
    console.log('http 初始化完成')
    this.http = axios.create()
  }

  /**
   * 入口
   * @param url
   * @param data
   * @param headers
   * @param method
   * @returns {Promise<unknown>}
   */
  request ({url, data = {}, headers, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      if (method === 'GET') {
        this._get({
          url: url,
          headers: headers,
          params: data,
          resolve: resolve,
          reject: reject
        })
      } else if (method === 'POST') {
        this._post({
          url: url,
          data: data,
          headers: headers,
          resolve: resolve,
          reject: reject
        })
      }
    })
  }

  /**
   * GET请求
   * @param url
   * @param headers
   * @param params
   * @param resolve
   * @param reject
   * @returns {AxiosPromise}
   */
  _get = ({url, headers, params = {}, resolve, reject}) => {
    return this.http({
      method: 'get',
      params: params,
      url: url,
      headers: headers
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  };

  /**
   * POST请求
   * @param url
   * @param headers
   * @param data
   * @param resolve
   * @param reject
   * @returns {AxiosPromise}
   */
  _post = ({url, headers, data = {}, resolve, reject}) => {
    return this.http({
      method: 'post',
      data: data,
      url: url,
      headers: headers
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  }
}
export default new Http()
