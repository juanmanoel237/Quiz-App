const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    question:{ type: String, require: true},
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, require: true}
})

module.exports = mongoose.model('Question', questionSchema)