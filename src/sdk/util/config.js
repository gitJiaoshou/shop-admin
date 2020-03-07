import common from './common'
import store from '../../store/index'

/**
 * 用户基础信息
 */
class Config {
  /**
   * 初始化配置
   * @param appKey
   * @param ygwId
   */
  init = ({appKey, ygwId}) => {
    let user = {}
    user.appKey = appKey
    user.shopId = 'appKey=' + appKey + ';ygwId=' + ygwId + ';osType=H5'
    // eslint-disable-next-line no-unused-vars
    let auth = {
      createTime: common.getTimeStamp(),
      count: 0,
      shopId: user.shopId
    }
    user.auth = auth
    store.dispatch('changUser', user)
  }

  /**
   * 获取用户信息
   */
  getUser = () => {
    return store.state.user
  }
  /**
   * 获取auth信息，并且+1
   * @returns {{}}
   */
  getAuth = () => {
    let user = store.state.user
    user.auth.count = user.auth.count + 1
    store.dispatch('changUser', user)
    return user.auth
  }
}
export default new Config()
