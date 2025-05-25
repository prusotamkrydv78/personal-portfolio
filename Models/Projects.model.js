const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    demoLink: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    techStack: {
        type: [String],
        required: true
    }

});

module.exports = mongoose.model('Projects', ProjectsSchema);
