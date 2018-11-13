const { relModel } = require('thinkorm')

module.exports = class extends relModel {
  init(config) {
    super.init(config)
    // 模型名称
    this.modelName = 'ProjectVersion'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      project: {
        type: 'integer'
      },
      name: {
        type: 'string',
        defaults: ''
      },
      state: {
        type: 'integer',
        defaults: 0
      }
    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {}
  }
}
