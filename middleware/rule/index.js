const Path = require("path");
const fs = require('fs');
module.exports = (options) => {
  let { app, rules = []} = options
  if (!app) {
    throw new Error('rule: the app params is necessary!')
  }
  const appKeys = Object.keys(app)
  rules.forEach(item => {
    let { path, name } = item
    if (appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }
    let content = {}
    fs.readdirSync(path).forEach(filename => {
      let extname = Path.extname(filename)
      if (extname === '.js') {
        let name = Path.basename(filename, extname)
        content[name] = require(Path.join(path, filename))
      }
    })
    app[name] = content
  })
}