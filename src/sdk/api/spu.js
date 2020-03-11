import model from '../server/spuModel'
/**
 * 对外API接口
 */
class Spu {
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
   * @param onSuccess
   * @param onFailure
   */
  save = ({title, subTitle, price, nowPrice, categoryId, status, images, bannerImgs, tages, specIds, remark, onSuccess, onFailure}) => {
    model.modelSave({
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
    })
      .then((res) => {
        console.log(res)
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
   * 分页查询
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
  /**
   * 修改状态
   * @param id
   * @param status
   * @param onSuccess
   * @param onFailure
   */
  status = ({id, status, onSuccess, onFailure}) => {
    model.modelStatus({
      id: id,
      status: status
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }

  /**
   * 删除
   * @param id
   * @param onSuccess
   * @param onFailure
   */
  delete = ({id, onSuccess, onFailure}) => {
    model.modelDelete({
      id: id
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Spu()
