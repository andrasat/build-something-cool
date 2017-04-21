const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  favouritePlaces: [{type: Schema.Types.ObjectId, ref:'Fav'}]
})

let User  = mongoose.model('User', userSchema)
module.exports = User