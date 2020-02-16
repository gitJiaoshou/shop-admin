import axios from 'axios'
/**
 * 封装http请求
 */
class Http {
  /**
   * 初始化操作
   */
  constructor () {
    this.http = axios.create()
  }

  /**
   * GET请求
   * @param url
   * @param headers
   * @param params
   * @returns {AxiosPromise}
   */
  get = ({url, headers, params = {}}) => {
    return this.http({
      method: 'get',
      params: params,
      url: url,
      headers: headers
    })
  }

  /**
   * POST请求
   * @param url
   * @param headers
   * @param data
   * @returns {AxiosPromise}
   */
  post = ({url, headers, data = {}}) => {
    return this.http({
      method: 'post',
      data: data,
      url: url,
      headers: headers
    })
  }
}
export default new Http()
