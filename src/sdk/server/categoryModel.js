import HTTP from '../util/Http'
import common from '../util/common'
class CategoryModel {
  /**
   * 根据pid查询
   * @param pid 默认查询所有一级菜单
   * @returns {Promise<unknown>}
   */
  modelQueryByPid = ({pid = 0}) => {
    let url = '/api/shop_user/goods/category/' + pid
    let headers = common.getBaseHeader()
    console.log(headers)
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: null,
        headers: headers,
        method: 'GET'
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}
export default new CategoryModel()
