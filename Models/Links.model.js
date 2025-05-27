const mongoose = require("mongoose")

const LinksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique:true
    },
    icon: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Links", LinksSchema)