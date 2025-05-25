const mongoose = require("mongoose")

const AboutsSchema = new mongoose.Schema({

    projects: Number,
    technology: Number,
    clients: Number,
    years: Number,

})

module.exports = mongoose.model("Abouts", AboutsSchema)