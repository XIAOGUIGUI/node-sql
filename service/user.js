const user = require("../models/user.js")
const dbConfig = require("../config").development.database

const userModel = new user(dbConfig);
const userService = {
  addUser: async(name) => {
    try {
      let result = await userModel.add({name})
      return {
        code: 0,
        data: result,
        msg: ''
      }
    } catch (error) {
      return {
        code: 1,
        msg: error.message
      }
    }
  },
  allUser: async(data) => {
    let result = await userModel.countSelect({
      num: data.pageSize,
      page: data.page
    }, false)
    console.log(result)
    return {
      code: 0,
      data: result,
      msg: ''
    }
  },
  userInfo: async(id) => {
    let result = await userModel.rel(true, {profile: ['test'], pet: ['types']}).where({id}).find().catch(err => {
      console.log(err)
    })
    console.log(result)
    return {
      code: 0,
      data: result,
      msg: ''
    }
  },
  updateUser: async(data) => {
    let result = await userModel.where({id: data.id}).update(data)
    console.log(result)
    return {
      code: 0,
      msg: '更新成功'
    }
  },
}

module.exports = userService
