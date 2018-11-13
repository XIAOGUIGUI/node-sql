const Gitlab = require('gitlab/dist/es5').default
const GITLAB_URL = 'http://pgitlab03.rmz.gomo.com'

let fromatTag = (list) => {
  let result = []
  for (let index = 0; index < list.length; index++) {
    result.push(list[index].name)
  }
  return result
}

const gitlabService = {
  projects: async(token) => {
    const gitLabApi = new Gitlab({
      url:   GITLAB_URL,
      token: token
    })
    let projects = await gitLabApi.Projects.all({
      membership: true
    })

    let result = []

    for (let index = 0; index < projects.length; index++) {
      let group = projects[index].namespace ? projects[index].namespace.name : ''
      let tags = await gitLabApi.Tags.all(projects[index].id)
      tags = fromatTag(tags)
      // let Members = await gitLabApi.ProjectMembers.all(projects[index].id, true)
      result.push({
        gitlabid: projects[index].id,
        name: projects[index].name,
        description: projects[index].description,
        web_url: projects[index].web_url,
        avatar_url: projects[index].avatar_url,
        group,
        tags
      })
    }
    return result
  }
}
module.exports = gitlabService
