import HTTP from '../util/Http'
import common from '../util/common'

class SpecValueModel {
  /**
   * 新增
   * @param name
   * @param unit
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelSave = ({specId, name}) => {
    let url = '/api/shop_goods/specValue/'
    let headers = common.getBaseHeader()
    let data = {
      name: name,
      specId: specId,
      status: 1
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'POST'
      })
        .then((res) => {
          console.log('-----specValueModel modelSave res:', res)
          if (res.data.code === 2000) {
            resolve({
              code: res.data.code,
              msg: res.data.reason
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.data.code,
              msg: res.data.reason
            })
          }
        })
        .catch((err) => {
          console.log('-----specValueModel modelSave error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '插入数据失败'
          })
        })
    })
  }

  /**
   * 根据specId（规格主键）查询
   * @param specId
   * @returns {Promise<unknown>}
   */
  modelQueryBySpecId = ({specId}) => {
    let url = '/api/shop_goods/specValue/' + specId
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----SpecValueModel modelQueryBySpecId res:', res)
          if (res.data.code === 2000) {
            resolve({
              code: res.data.code,
              msg: res.data.data
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.data.code,
              msg: res.data.reason
            })
          }
        })
        .catch((err) => {
          console.log('-----SpecValueModel modelQueryBySpecId error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取规格值失败'
          })
        })
    })
  }

  /**
   * 删除
   * @param id
   * @returns {Promise<unknown>}
   */
  modelDelete = ({id}) => {
    let url = '/api/shop_goods/specValue/' + id
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----SpecValueModel modelDelete res:', res)
          if (res.data.code === 2000) {
            resolve({
              code: res.data.code,
              msg: res.data.reason
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.data.code,
              msg: res.data.reason
            })
          }
        })
        .catch((err) => {
          console.log('-----SpecValueModel modelDelete error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '删除失败'
          })
        })
    })
  }

  /**
   * 更新
   * @param id
   * @param specId
   * @param name
   * @returns {Promise<unknown>}
   */
  modelUpdate = ({id, specId, name}) => {
    let url = '/api/shop_goods/specValue/'
    let headers = common.getBaseHeader()
    let data = {
      id: id,
      specId: specId,
      name: name
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'PUT'
      })
        .then((res) => {
          console.log('-----SpecValueModel modelUpdate res:', res)
          if (res.data.code === 2000) {
            resolve({
              code: res.data.code,
              msg: res.data.reason
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.data.code,
              msg: res.data.reason
            })
          }
        })
        .catch((err) => {
          console.log('-----SpecValueModel modelUpdate error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '更新数据失败'
          })
        })
    })
  }
}
export default new SpecValueModel()
