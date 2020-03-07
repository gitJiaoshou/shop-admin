import model from '../server/categoryModel'

/**
 * 对外API接口
 */
class Category {
  /**
   * 根据pid查询
   * @param pid 默认查询所有一级菜单
   * @param onSuccess  成功回调
   * @param onFailure  失败回调
   */
  queryByPid = ({pid, onSuccess, onFailure}) => {
    model.modelQueryByPid({pid: pid})
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
  /**
   * 新增菜单
   * @param pid
   * @param name
   * @param sort
   * @param remark
   * @param status
   * @param onSuccess
   * @param onFailure
   */
  addMenu = ({pid, name, sort, remark, status, onSuccess, onFailure}) => {
    model.modelAddMenu({
      pid: pid,
      name: name,
      sort: sort,
      remark: remark,
      status: status
    })
      .then((res) => {
        onSuccess(res.code, res.msg)
      })
      .catch((err) => {
        onFailure(err.code, err.msg)
      })
  }
}
export default new Category()
