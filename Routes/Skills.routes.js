const express = require("express")
const SkillsModel = require("../Models/Skills.model")
const SkillsRouter = express.Router()

SkillsRouter.get("/skills", async (req, res) => {
    const Skills = await SkillsModel.find({})
    res.json({
        success: true,
        page: "Skills",
        data: Skills
    })
})

SkillsRouter.post("/skills", async (req, res) => {

    try {
        const data = await req.body;
        const newSkills = await SkillsModel.create({ ...data })
        await newSkills.save()
        res.json({
            success: true,
            page: "Skills",
            data: newSkills
        })
    } catch (error) {
        res.json({
            success: false,
            page: "Skills",
            data: newSkills,
            error
        })
    }

})


module.exports = SkillsRouter