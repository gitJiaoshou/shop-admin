import HTTP from '../util/Http'
import common from '../util/common'

class BannerModel {
  /**
   * 保存
   * @param images
   * @param spu
   * @param remark
   * @returns {Promise<unknown>}
   */
  modelSave = ({images, spu, remark}) => {
    let url = '/api/shop_goods/banner/'
    let headers = common.getBaseHeader()
    let data = {
      appKey: common.getUser().appKey,
      images: images,
      spu: spu,
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
          console.log('-----BannerModel modelSave res:', res)
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
          console.log('-----BannerModel modelSave error:', err)
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
    let url = '/api/shop_goods/banner/'
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----BannerModel modelQuery res:', res)
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
          console.log('-----BannerModel modelQuery error', err)
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
   * @param spu
   * @param remark
   */
  modelUpdate = ({id, images, spu, remark}) => {
    let url = '/api/shop_goods/banner/'
    let headers = common.getBaseHeader()
    let data = {
      id: id,
      appKey: common.getUser().appKey,
      images: images,
      spu: spu,
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
          console.log('-----BannerModel modelUpdate res:', res)
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
          console.log('-----BannerModel modelUpdate error:', err)
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
    let url = '/api/shop_goods/banner/' + id
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'DELETE'
      })
        .then((res) => {
          console.log('-----BannerModel modelDelete res:', res)
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
          console.log('-----BannerModel modelDelete error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '删除失败'
          })
        })
    })
  }
}
export default new BannerModel()
