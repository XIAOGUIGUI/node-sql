const user = require("../models/user.js")
const dbConfig = require("../config").development.database

const userModel = new user(dbConfig);
const userService = {
  addUser: async(name) => {
    let result = await userModel.add({name})
    console.log(result)
    return {
      code: 0,
      msg: ''
    }
  },
  allUser: async() => {
    let result = await userModel.select()
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
