const { relModel } = require('thinkorm')

module.exports = class extends relModel {
  init(config) {
    // 模型名称
    this.modelName = 'Pet'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      types: {
        type: 'string',
        defaults: ''
      },
      user: {
        type: 'integer',
        defaults: ''
      }
    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {}
  }
}
