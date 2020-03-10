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
  modelSave = ({title, subTitle, price, nowPrice, categoryId, status, images, bannerImgs, tags, specIds, remark}) => {
    let url = '/api/shop_user/goods/spu/'
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
      tags: tags,
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
}
export default new SpuModel()
