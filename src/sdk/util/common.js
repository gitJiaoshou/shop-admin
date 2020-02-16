import Config from './config'

/**
 * 公共方法
 */
class Common {
  /**
   * 获取时间戳
   * @returns {string}
   */
  getTimeStamp = () => {
    let timeStamp = (Date.parse(new Date())).toString()
    return timeStamp
  }

  /**
   * 获取基础头信息
   * @returns {{AppKey: *, Auth: *, ShopId: *}}
   */
  getBaseHeader = () => {
    return {
      'AppKey': Config.config.appKey,
      'ShopId': Config.config.shopId,
      'Auth': Config.config.auth
    }
  }
}
export default new Common()
