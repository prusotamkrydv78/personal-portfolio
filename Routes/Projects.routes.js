const express = require("express")
const ProjectsModel = require("../Models/Projects.model")
const ProjectsRouter = express.Router()

ProjectsRouter.get("/projects", async (req, res) => {
    const Projects = await ProjectsModel.find({})
    res.json({
        success: true,
        page: "Projects",
        data: Projects
    })
})

ProjectsRouter.post("/projects", async (req, res) => {

    try {
        const data = await req.body;
        const newProjects = await ProjectsModel.create({ ...data })
        await newProjects.save()
        res.json({
            success: true,
            page: "Projects",
            data: newProjects
        })
    } catch (error) {
        res.json({
            success: false,
            page: "Projects",
            data: newProjects,
            error
        })
    }

})


module.exports = ProjectsRouter