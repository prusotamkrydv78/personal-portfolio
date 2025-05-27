const mongoose = require("mongoose")

const AboutsSchema = new mongoose.Schema({

    projects: {
        type: Number,
        required: true
    },
    technology: {
        type: Number,
        required: true
    },
    clients: {
        type: Number,
        required: true
    },
    years: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model("Abouts", AboutsSchema)