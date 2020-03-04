import HTTP from '../util/Http'
import Common from '../util/common'

class CategoryModel extends HTTP {
  /**
   * 根据pid查询
   * @param pid 默认查询所有一级菜单
   * @returns {Promise<unknown>}
   */
  modelQueryByPid = ({pid = 0}) => {
    console.log('================')
    let url = '/api/shop_user/user/admin/login'
    let data = {
      pid: pid
    }
    let headers = Common.getBaseHeader()
    return new Promise((resolve, reject) => {
      this.request({
        url: url,
        data: data,
        headers: headers,
        method: 'GET'
      })
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export default new CategoryModel()
