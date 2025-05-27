const AboutsModel = require("./Models/Abouts.model");
const LinksModel = require("./Models/Links.model");
const ProjectsModel = require("./Models/Projects.model");
const SkillsModel = require("./Models/Skills.model");



const AdminData = async () => {
    const LinksData = await LinksModel.find({})
    const AboutsData = await AboutsModel.find({})
    const ProjectsData = await ProjectsModel.find({})
    const SkillsData = await SkillsModel.find({})
    const Data = {
        LinksData, AboutsData,
        ProjectsData, SkillsData
    }
    return Data;

}
module.exports = AdminData;