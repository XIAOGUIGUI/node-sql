const { relModel } = require('thinkorm')

module.exports = class extends relModel {
  init(config) {
    // 模型名称
    this.modelName = 'Profile'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      test: {
        type: 'json'
      }
    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {}
  }
}
