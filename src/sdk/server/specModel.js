import HTTP from '../util/Http'
import common from '../util/common'

class SpecModel {
  /**
   * 获取全量规格
   * @returns {Promise<unknown>}
   */
  modelQueryAll = () => {
    let url = '/api/shop_user/goods/spec/'
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----modelQueryAll res:', res)
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
          console.log('-----modelQueryAll error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取规格失败'
          })
        })
    })
  }

  /**
   * 新增
   * @param name
   * @param unit
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelSave = ({name, unit, remark}) => {
    let url = '/api/shop_user/goods/spec/'
    let headers = common.getBaseHeader()
    let data = {
      name: name,
      unit: unit,
      remark: remark,
      appKey: common.getUser().appKey,
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
          console.log('-----modelSave res:', res)
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
          console.log('-----modelSave error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '插入数据失败'
          })
        })
    })
  }

  /**
   * 更新
   * @param name
   * @param unit
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelUpdate = ({specId, name, unit, remark}) => {
    let url = '/api/shop_user/goods/spec/'
    let headers = common.getBaseHeader()
    let data = {
      specId: specId,
      name: name,
      unit: unit,
      remark: remark,
      appKey: common.getUser().appKey,
      status: 1
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'PUT'
      })
        .then((res) => {
          console.log('-----modelUpdate res:', res)
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
          console.log('-----modelUpdate error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '更新数据失败'
          })
        })
    })
  }

  /**
   * 删除
   * @param specId
   * @returns {Promise<unknown>}
   */
  modelDelete = ({specId}) => {
    let url = '/api/shop_user/goods/spec/' + specId
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----modelDelete res:', res)
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
          console.log('-----modelDelete error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '删除失败'
          })
        })
    })
  }
}
export default new SpecModel()
