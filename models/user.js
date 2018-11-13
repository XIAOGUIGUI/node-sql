const { relModel } = require('thinkorm')
const Profile = require('./profile.js')
const Pet = require('./pet.js')
const Group = require('./group.js')
const UserGroup = require('./userGroup.js')

module.exports = class extends relModel {
  // 构造方法
  init() {
    // 模型名称,映射实体表 user
    this.modelName = 'user'
    // 数据表字段信息
    this.fields = {
      id: {
        type: 'integer',
        pk: true
      },
      name: {
        type: 'string',
        size: 255,
        index: true,
        defaults: ''
      }
    }
    // 数据验证
    this.validations = {
      name: {
        method: 'ALL', //ADD 新增时检查, UPDATE 更新时检查, ALL 新增和更新都检查,如果属性不存在则不检查
        valid: ['required', 'length'],
        length_args: 5,
        msg: {
          required: '姓名必填',
          length: '姓名长度必须大于5'
        }
      }
    }
    // 关联关系
    // 关联关系
    this.relations = {
      profile: {
        type: 'hasone', //关联方式
        model: Profile, //子表模型
        field: ['test'],//关联表字段
        fkey: 'profile', //主表外键 (子表主键)
        rkey: 'id' //子表主键
      },
      pet: {
        type: 'hasmany',
        model: Pet, //子表模型
        field: ['types', 'id'],
        fkey: '', //hasmany关联此值没用
        rkey: 'user' //子表外键 (主表主键)
      },
      group: {
        type: 'manytomany',
        model: Group, //子表模型
        //field: ['name', 'type', 'id'],
        fkey: 'userid', //map外键(主表主键)
        rkey: 'groupid', //map外键(子表主键)
        map: UserGroup //map模型
      }
    }
  }
}
