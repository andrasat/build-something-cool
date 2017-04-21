const mongoose = require('mongoose')
const Schema = mongoose.Schema

let favSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  favouritePlaces: [{type: Schema.Types.ObjectId, ref:''}]
})

let Fav  = mongoose.model('Fav', favSchema)
module.exports = Fav