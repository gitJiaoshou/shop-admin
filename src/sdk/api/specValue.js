import model from '../server/specValueModel'
/**
 * 对外API接口
 */
class SpecValue {
  /**
   * 新增
   * @param name
   * @param unit
   * @param remark
   * @param onSuccess
   * @param onFailure
   */
  save = ({specId, name, onSuccess, onFailure}) => {
    model.modelSave({
      specId: specId,
      name: name
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 根据规格查询
   * @param specId
   * @param onSuccess
   * @param onFailure
   */
  queryBySpecId = ({specId, onSuccess, onFailure}) => {
    model.modelQueryBySpecId({
      specId: specId
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
   * @param specId
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
export default new SpecValue()
