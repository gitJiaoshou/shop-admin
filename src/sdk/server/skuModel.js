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

  /**
   * 分页
   * @param index
   * @param limit
   */
  modelPage = ({index = '0', limit = '10'}) => {
    let url = '/api/shop_user/goods/sku/page'
    let headers = common.getBaseHeader()
    let data = {
      index: index,
      limit: limit
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----SkuModel modelPage res:', res)
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
          console.log('-----SkuModel modelPage error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取信息失败'
          })
        })
    })
  }

  /**
   * 修改上线下线状态
   * @param id
   * @param status
   */
  modelStatus = ({id, status}) => {
    let url = '/api/shop_user/goods/sku/' + id + '/' + status
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'PATCH'
      })
        .then((res) => {
          console.log('-----SkuModel modelStatus res:', res)
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
          console.log('-----SkuModel modelStatus error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '修改失败'
          })
        })
    })
  }

  /**
   * 修改
   * @param id
   * @param spu
   * @param price
   * @param code
   * @param stock
   * @param status
   * @param images
   * @param specIds
   */
  modelUpdate = ({id, spu, price, code, stock, status, images, specIds}) => {
    let url = '/api/shop_user/goods/sku/'
    let headers = common.getBaseHeader()
    let data = {
      id: id,
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
        method: 'PUT'
      })
        .then((res) => {
          console.log('-----SkuModel modelUpdate res:', res)
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
          console.log('-----SkuModel modelUpdate error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '修改数据失败'
          })
        })
    })
  }

  /**
   * 删除
   * @param id
   */
  modelDelete = ({id}) => {
    let url = '/api/shop_user/goods/sku/' + id
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----SkuModel modelDelete res:', res)
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
          console.log('-----SkuModel modelDelete error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '删除失败'
          })
        })
    })
  }
}
export default new SkuModel()
