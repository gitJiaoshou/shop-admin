import model from '../server/skuModel'
/**
 * 对外API接口
 */
class Sku {
  /**
   * 新增
   * @param spu
   * @param price
   * @param code
   * @param stock
   * @param status
   * @param images
   * @param specIds
   * @param onSuccess
   * @param onFailure
   */
  save = ({spu, price, code, stock, status, images, specIds, onSuccess, onFailure}) => {
    model.modelSave({
      spu: spu,
      price: price,
      code: code,
      stock: stock,
      status: status,
      images: images,
      specIds: specIds
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 获取数量
   * @param onSuccess
   * @param onFailure
   */
  size = ({onSuccess, onFailure}) => {
    model.modelSize()
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }

  /**
   * 分页
   * @param index
   * @param limit
   * @param onSuccess
   * @param onFailure
   */
  page = ({index, limit, onSuccess, onFailure}) => {
    model.modelPage({
      index: index,
      limit: limit
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Sku()
