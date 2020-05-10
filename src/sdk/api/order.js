import model from '../server/orderModel'

/**
 * 对外API接口
 */
class Order {
  /**
   * 查询所有
   * @param onSuccess
   * @param onFailure
   */
  queryOrder = ({status, payStatus, onSuccess, onFailure}) => {
    model.modelQuery({
      status: status,
      payStatus: payStatus
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 查询订单详情
   * @param orderId
   * @param onSuccess
   * @param onFailure
   */
  queryOsku = ({orderId, onSuccess, onFailure}) => {
    model.modelQueryOsku({
      orderId: orderId
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Order()
