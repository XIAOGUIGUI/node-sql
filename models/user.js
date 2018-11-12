const {model, helper} = require('thinkorm')

module.exports = class extends model {
    // 构造方法
    init(){
        // 模型名称,映射实体表 user
        this.modelName = 'user';
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
    }
}
