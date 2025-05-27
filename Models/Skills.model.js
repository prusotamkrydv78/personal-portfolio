const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    skills: [
        {
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            percentage: {
                type: Number,
                required: true
            },
            techStack: {
                type: String,
                enum: ["frontend", "backend", "interactions"],
            },
        },
    ],
    currLearning: [
        {

            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            percentage: {
                type: Number,
                required: true
            },
        }
    ]
});

module.exports = mongoose.model("Skills", SkillsSchema);
