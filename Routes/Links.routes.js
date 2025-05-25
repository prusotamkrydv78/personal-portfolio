const express = require("express")
const LinksModel = require("../Models/Links.model")
const LinksRouter = express.Router()

LinksRouter.get("/links", async (req, res) => {
    const Links = await LinksModel.find({})
    res.json({
        success: true,
        page: "Links",
        data: Links
    })
})

LinksRouter.post("/links", async (req, res) => {

    try {
        const data = await req.body;
        const newLinks = await LinksModel.create({ ...data })
        await newLinks.save()
        res.json({
            success: true,
            page: "Links",
            data: newLinks
        })
    } catch (error) {
        res.json({
            success: false,
            page: "Links",
            data: newLinks,
            error
        })
    }

})


module.exports = LinksRouter