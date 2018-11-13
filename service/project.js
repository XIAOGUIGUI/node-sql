const Project = require("../models/project.js")
const UserProject = require("../models/userProject.js")
const ProjectVersion = require("../models/projectVersion.js")
const dbConfig = require("../config").development.database

const projectModel = new Project(dbConfig);
const userProjectModel = new UserProject(dbConfig);
const projectVersionModel = new ProjectVersion(dbConfig);
const projectService = {
  init: async(projects, userid) => {
    let data = await projectModel.transaction(async function (t) {

      for (let index = 0; index < projects.length; index++) {
        let projectId = await projectModel.where({gitlabid: projects[index].gitlabid}).thenAdd(projects[index])
        if (projectId === null) {
          let projectResult= await projectModel.where({gitlabid: projects[index].gitlabid}).field('id').find()
          projectId = projectResult.id
        }
        let userProject = {userid, projectid: projectId}
        await userProjectModel.where(userProject).thenAdd(userProject)
        let tags = projects[index].tags
        for (let i = 0; i < tags.length; i++) {
          await projectVersionModel.where({project: projectId, name: tags[i]}).thenAdd({name: tags[i], project: projectId})
        }
      }
      return true
    })
    console.log(data)
    if (data === true) {
      return {
        code: 0,
        msg: ''
      }
    } else {
      return {
        code: 1,
        msg: ''
      }
    }
  }
}

module.exports = projectService
