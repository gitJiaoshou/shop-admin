import HTTP from '../util/Http'
import common from '../util/common'

class SkuModel {
  /**
   * 新增
   * @param spu
   * @param price
   * @param code
   * @param stock
   * @param status
   * @param images
   * @param specIds
   */
  modelSave = ({spu, price, code, stock, status, images, specIds}) => {
    let url = '/api/shop_user/goods/sku/'
    let headers = common.getBaseHeader()
    let data = {
      spu: spu,
      price: price,
      code: code,
      stock: stock,
      status: status,
      images: images,
      specIds: specIds
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'POST'
      })
        .then((res) => {
          console.log('-----SkuModel modelSave res:', res)
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
          console.log('-----SkuModel modelSave error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '插入数据失败'
          })
        })
    })
  }

  /**
   * 获取数量
   */
  modelSize = () => {
    let url = '/api/shop_user/goods/sku/size'
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----SkuModel modeSize res:', res)
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
          console.log('-----SkuModel modeSize error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取数量失败'
          })
        })
    })
  }
}
export default new SkuModel()
