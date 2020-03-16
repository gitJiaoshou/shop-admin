import model from '../server/bannerModel'

/**
 * 对外API接口
 */
class Banner {
  /**
   * 保存
   * @param images
   * @param spu
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  save = ({images, spu, remark, onSuccess, onFailure}) => {
    model.modelSave({
      images: images,
      spu: spu,
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
   * @param spu
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  update = ({id, images, spu, remark, onSuccess, onFailure}) => {
    model.modelUpdate({
      id: id,
      images: images,
      spu: spu,
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
export default new Banner()
