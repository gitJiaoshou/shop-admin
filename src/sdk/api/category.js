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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export default new Category()
