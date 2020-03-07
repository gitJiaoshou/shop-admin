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
  /**
   * 新增菜单
   * @param pid   父级ID
   * @param name  名称
   * @param sort  排序
   * @param remark备注
   * @param status状态
   * @returns {Promise<unknown>}
   */
  modelAddMenu = ({pid, name, sort, remark, status}) => {
    let url = '/api/shop_user/goods/category/'
    let headers = common.getBaseHeader()
    let data = {
      pid: pid,
      name: name,
      appKey: common.getUser().appKey,
      sort: sort,
      remark: remark,
      status: status
    }
    return new Promise((resolve, reject) => {
      HTTP.request({
        url: url,
        data: data,
        headers: headers,
        method: 'POST'
      })
        .then((res) => {
          console.log('----modelAddMenu res:', res)
          if (res.data.code === 2000) {
            resolve({
              code: res.data.code,
              msg: res.data.reason
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: res.data.code,
              msg: res.data.reason
            })
          }
        })
        .catch((err) => {
          console.log('----modelAddMenu error:', err)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            code: 5000,
            msg: '插入数据失败'
          })
        })
    })
  }
}
export default new CategoryModel()
