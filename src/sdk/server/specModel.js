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
      appKey: common.getUser().appKey
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
}
export default new SpecModel()
