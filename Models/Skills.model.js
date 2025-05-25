const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    skills: [
        {
            name: String,
            icon: String,
            percentage: Number,
            techStack: {
                type: String,
                enum: ["frontend", "backend", "interactions"],
            },
        },
    ],
    currLearning: [
        {

            name: String,
            icon: String,
            percentage: Number,
        }
    ]
});

module.exports = mongoose.model("Skills", SkillsSchema);
