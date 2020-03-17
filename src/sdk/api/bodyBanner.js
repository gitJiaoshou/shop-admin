import model from '../server/bodyBannerModel'

/**
 * 对外API接口
 */
class BodyBanner {
  /**
   * 保存
   * @param images
   * @param title
   * @param categoryId
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  save = ({images, title, categoryId, remark, onSuccess, onFailure}) => {
    model.modelSave({
      images: images,
      title: title,
      categoryId: categoryId,
      remark: remark
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 查询
   * @param onSuccess
   * @param onFailure
   */
  queryAll = ({onSuccess, onFailure}) => {
    model.modelQuery()
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 更新
   * @param id
   * @param images
   * @param title
   * @param categoryId
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  update = ({id, images, title, categoryId, remark, onSuccess, onFailure}) => {
    model.modelUpdate({
      id: id,
      images: images,
      title: title,
      categoryId: categoryId,
      remark: remark
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
   */
  delete = ({id, onSuccess, onFailure}) => {
    model.modelDelete({
      id: id
    })
      .then((res) => {
        console.log(res)
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new BodyBanner()
