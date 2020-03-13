import HTTP from '../util/Http'
import common from '../util/common'

class SpuModel {
  /**
   * 新增
   * @param title
   * @param subTitle
   * @param price
   * @param nowPrice
   * @param categoryId
   * @param status
   * @param images
   * @param bannerImgs
   * @param tags
   * @param specIds
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelSave = ({title, subTitle, price, nowPrice, categoryId, status, images, bannerImgs, tages, specIds, remark}) => {
    let url = '/api/shop_goods/spu/'
    let headers = common.getBaseHeader()
    let data = {
      title: title,
      subTitle: subTitle,
      price: price,
      nowPrice: nowPrice,
      categoryId: categoryId,
      status: status,
      images: images,
      bannerImgs: bannerImgs,
      tages: tages,
      specIds: specIds,
      remark: remark
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'POST'
      })
        .then((res) => {
          console.log('-----SpuModel modelSave res:', res)
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
          console.log('-----SpuModel modelSave error:', err)
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
   * @returns {Promise<unknown>}
   */
  modelSize = () => {
    let url = '/api/shop_goods/spu/size'
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----SpuModel modeSize res:', res)
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
          console.log('-----SpuModel modeSize error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取数量失败'
          })
        })
    })
  }

  /**
   * 分页查询
   * @param index
   * @param limit
   * @returns {Promise<unknown>}
   */
  modelPage = ({index = '0', limit = '10'}) => {
    let url = '/api/shop_goods/spu/page'
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
          console.log('-----SpuModel modelPage res:', res)
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
          console.log('-----SpuModel modelPage error', err)
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
    let url = '/api/shop_goods/spu/' + id + '/' + status
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'PATCH'
      })
        .then((res) => {
          console.log('-----SpuModel modelStatus res:', res)
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
          console.log('-----SpuModel modelStatus error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '修改失败'
          })
        })
    })
  }

  /**
   * 删除
   * @param id
   */
  modelDelete = ({id}) => {
    let url = '/api/shop_goods/spu/' + id
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----SpuModel modelDelete res:', res)
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
          console.log('-----SpuModel modelDelete error', err)
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
   * @param title
   * @param subTitle
   * @param price
   * @param nowPrice
   * @param categoryId
   * @param status
   * @param images
   * @param bannerImgs
   * @param tages
   * @param specIds
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelUpdate = ({id, title, subTitle, price, nowPrice, categoryId, status, images, bannerImgs, tages, specIds, remark}) => {
    let url = '/api/shop_goods/spu/'
    let headers = common.getBaseHeader()
    let data = {
      id: id,
      title: title,
      subTitle: subTitle,
      price: price,
      nowPrice: nowPrice,
      categoryId: categoryId,
      status: status,
      images: images,
      bannerImgs: bannerImgs,
      tages: tages,
      specIds: specIds,
      remark: remark
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'PUT'
      })
        .then((res) => {
          console.log('-----SpuModel modelUpdate res:', res)
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
          console.log('-----SpuModel modelUpdate error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '更新数据失败'
          })
        })
    })
  }

  /**
   * 根据主键查询
   * @param spu
   * @returns {Promise<unknown>}
   */
  modelQueryBySpuId = ({spu}) => {
    let url = '/api/shop_goods/spu/' + spu
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----SpuModel modelQueryBySpuId res:', res)
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
          console.log('-----SpuModel modelQueryBySpuId error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取信息失败'
          })
        })
    })
  }
}
export default new SpuModel()
