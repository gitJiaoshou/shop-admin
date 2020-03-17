import HTTP from '../util/Http'
import common from '../util/common'

class BodyBannerModel {
  /**
   * 保存
   * @param images
   * @param title
   * @param categoryId
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelSave = ({images, title, categoryId, remark}) => {
    let url = '/api/shop_goods/bodyBanner/'
    let headers = common.getBaseHeader()
    let data = {
      appKey: common.getUser().appKey,
      images: images,
      title: title,
      categoryId: categoryId,
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
          console.log('-----BodyBannerModel modelSave res:', res)
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
          console.log('-----BodyBannerModel modelSave error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '插入数据失败'
          })
        })
    })
  }

  /**
   * 查询数据
   * @returns {Promise<unknown>}
   */
  modelQuery = () => {
    let url = '/api/shop_goods/bodyBanner/'
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----BodyBannerModel modelQuery res:', res)
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
          console.log('-----BodyBannerModel modelQuery error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取信息失败'
          })
        })
    })
  }

  /**
   * 更新
   * @param id
   * @param images
   * @param title
   * @param categoryId
   * @param remark
   */
  modelUpdate = ({id, images, title, categoryId, remark}) => {
    let url = '/api/shop_goods/bodyBanner/'
    let headers = common.getBaseHeader()
    let data = {
      id: id,
      appKey: common.getUser().appKey,
      images: images,
      title: title,
      categoryId: categoryId,
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
          console.log('-----BodyBannerModel modelUpdate res:', res)
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
          console.log('-----BodyBannerModel modelUpdate error:', err)
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
    let url = '/api/shop_goods/bodyBanner/' + id
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----BodyBannerModel modelDelete res:', res)
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
          console.log('-----BodyBannerModel modelDelete error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '删除失败'
          })
        })
    })
  }
}
export default new BodyBannerModel()
