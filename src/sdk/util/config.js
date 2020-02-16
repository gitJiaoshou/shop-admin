import common from './common'
/**
 * 用户基础信息
 */
class Config {
  constructor () {
    console.log('config 初始化了')
    this.config = {}
  }

  /**
   * 初始化配置
   * @param appKey
   * @param ygwId
   */
  init ({appKey, ygwId}) {
    this.config.appKey = appKey
    this.config.shopId = 'appKey=' + appKey + ';ygwId=' + ygwId + ';osType=H5'
    // eslint-disable-next-line no-unused-vars
    let auth = {
      createTime: common.getTimeStamp(),
      count: 0,
      shopId: this.config.shopId
    }
    this.config.auth = JSON.stringify(auth)
  }
}
export default new Config()
