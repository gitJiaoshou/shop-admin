import model from '../server/logisticModel'

class Logistic {
  /**
   * 发送快的
   * @param code
   * @param order
   * @param receiver
   * @param onSuccess
   * @param onFailure
   */
  logisticAdd = ({code, order, receiver, onSuccess, onFailure}) => {
    model.modelAdd({
      code: code,
      order: order,
      receiver: receiver
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Logistic()
