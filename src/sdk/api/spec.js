import model from '../server/specModel'

/**
 * 对外API接口
 */
class Spec {
  /**
   * 获取全量信息
   */
  queryAll = ({onSuccess, onFailure}) => {
    model.modelQueryAll()
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 新增
   * @param name
   * @param unit
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  save = ({name, unit, remark, onSuccess, onFailure}) => {
    model.modelSave({
      name: name,
      unit: unit,
      remark: remark
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Spec()
