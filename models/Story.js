const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public','private']    //'enum' is - list of possible values
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',       // reference : 'User' model
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Story',StorySchema)