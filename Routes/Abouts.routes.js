const express = require("express")
const AboutsModel = require("../Models/Abouts.model")

const AboutsRouter = express.Router()


AboutsRouter.get("/abouts", async (req, res) => {
    const Abouts = await AboutsModel.find({})
    res.json({
        success: true,
        page: "Abouts",
        data: Abouts
    })
})

AboutsRouter.post("/abouts", async (req, res) => {

    try {
        const data = await req.body;
        const newAbouts = await AboutsModel.create({ ...data })
        await newAbouts.save()
        res.json({
            success: true,
            page: "Abouts",
            data: newAbouts
        })
    } catch (error) {
        res.json({
            success: false,
            page: "Abouts",
            data: newAbouts,
            error
        })
    }

})

module.exports = AboutsRouter