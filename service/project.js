const Project = require("../models/project.js")
const ProjectVersion = require("../models/projectVersion.js")
const dbConfig = require("../config").development.database

const projectModel = new Project(dbConfig);
const projectVersionModel = new ProjectVersion(dbConfig);
const projectService = {
  init: async(projects) => {
    projectModel.transaction(async function (t) {
      for (let index = 0; index < projects.length; index++) {
        let projectId = await projectModel.where({gitlabid: projects[index].gitlabid}).thenAdd(projects[index])
        if (projectId === null) {
          let projectResult= await projectModel.where({gitlabid: projects[index].gitlabid}).field('id').find()
          projectId = projectResult.id
        }
        let tags = projects[index].tags
        for (let i = 0; i < tags.length; i++) {
          await projectVersionModel.where({project: projectId, name: tags[i]}).thenAdd({name: tags[i], project: projectId})
        }
      }
      return true
    }).then(data => {
      console.log(data);//事务commit后打印
    })
  }
}

module.exports = projectService
