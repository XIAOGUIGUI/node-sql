const config = {
  token: 'gomo-publish',
  development: {
    port: 3001,
    database: {
      db_type: 'mysql',
      db_host: 'sbasdbs01.rmz.gomo.com', // 服务器地址
      db_port: 3306, // 端口
      db_name: 'think_orm', // 数据库名
      db_user: 'jbjava', // 用户名
      db_pwd: 'jb98' // 密码
    }
  },
  production: {
    port: 3001,
    database: {
      DATABASE: 'koa_demo',
      USERNAME: 'root',
      PASSWORD: 'abc123',
      PORT: '3306',
      HOST: 'localhost'
    }
  }
}

module.exports = config
