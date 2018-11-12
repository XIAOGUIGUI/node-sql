const { relModel } = require('thinkorm')

module.exports = class extends relModel {
  init(config) {
    // 模型名称
    this.modelName = 'Group'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      name: {
        type: 'string',
        defaults: ''
      },
      type: {
        type: 'string',
        defaults: ''
      }
    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {}
  }
}
