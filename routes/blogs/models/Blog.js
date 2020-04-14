const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, lowercase: true },
    subject: { type: String, lowercase: true },
    author: { type: String, lowercase: true },
    article: String
})

module.exports = mongoose.model('Blog', BlogSchema);