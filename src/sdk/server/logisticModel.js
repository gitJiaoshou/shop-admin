import HTTP from '../util/Http'
import common from '../util/common'
class LogisticModel {
  /**
   * 发送快递
   * @param code
   * @param order
   * @param receiver
   * @returns {Promise<unknown>}
   */
  modelAdd = ({code, order, receiver}) => {
    let url = '/api/shop_order_admin/logistic/'
    let headers = common.getBaseHeader()
    // eslint-disable-next-line no-unused-vars
    let data = {
      code: code,
      orders: order,
      receiver: receiver,
      sender: common.getUser().ygwId
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'POST'
      })
        .then((res) => {
          console.log('-----LogisticModel modelAdd res:', res)
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
          console.log('-----OrderModel modelQuery error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '发送快递失败'
          })
        })
    })
  }
}
export default new LogisticModel()
