const { relModel } = require('thinkorm')

module.exports = class extends relModel {
  init(config) {
    super.init(config)
    // 模型名称
    this.modelName = 'UserProject'
    // 数据表字段信息
    this.fields = {
      userid: {
        type: 'integer',
        index: true,
        defaults: ''
      },
      projectid: {
        type: 'integer',
        index: true,
        defaults: ''
      }
    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {}
  }
}
