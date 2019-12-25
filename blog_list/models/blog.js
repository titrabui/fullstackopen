const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const uniqueValidator = require('mongoose-unique-validator')
mongoose.plugin(uniqueValidator)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
