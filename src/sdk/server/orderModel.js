import HTTP from '../util/Http'
import common from '../util/common'
class OrderModel {
  /**
   * 订单状态   1未付款 2已付款 3已发货 4已签收
   * @param status
   */
  modelQuery = ({status, payStatus}) => {
    let url = '/api/shop_order_admin/order/query?status=' + status + '&payStatus=' + payStatus
    let headers = common.getBaseHeader()
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log('-----OrderModel modelQuery res:', res)
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
          console.log('-----OrderModel modelQuery error', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '获取订单失败'
          })
        })
    })
  }
}
export default new OrderModel()
