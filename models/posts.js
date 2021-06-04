const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		created_by: { type: String, required: true },
        detailed_text: { type: String, required: true },
        date_of_post: { type: Date, required: true }
	},
	{ collection: 'posts' }
)

const model = mongoose.model('PostSchema', PostsSchema)

module.exports = model
