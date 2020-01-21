const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')
mongoose.plugin(uniqueValidator)

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  name: String,
  password: {
    type: String,
    minlength: 3,
    required: true
  },
  favoriteGenre: {
    type: String,
    minlength: 1
  }
})

module.exports = mongoose.model('User', userSchema)
