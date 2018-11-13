const { relModel } = require('thinkorm')
const ProjectVersion = require('./projectVersion.js')
module.exports = class extends relModel {
  init() {
    // 模型名称
    this.modelName = 'Project'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      gitlabid: {
        type: 'integer',
        unique: true,
        defaults: ''
      },
      name: {
        type: 'string',
        defaults: ''
      },
      group: {
        type: 'string',
        defaults: ''
      },
      description: {
        type: 'string',
        defaults: ''
      },
      web_url: {
        type: 'string',
        defaults: ''
      },
      avatar_url: {
        type: 'string',
        defaults: ''
      }

    }
    // 数据验证
    this.validations = {}
    // 关联关系
    this.relations = {
      pet: {
        type: 'hasmany',
        model: ProjectVersion,
        rkey: 'project'
      }
    }
  }
}
