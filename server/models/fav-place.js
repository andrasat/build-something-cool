const mongoose = require('mongoose')
const Schema = mongoose.Schema

let favSchema = new Schema({
  name: String,
  url: String,
  location: {
    address: String,
    locality: String,
    city: String,
    city_id: Number,
    country_id: Number
  },
  user_rating: {
    aggregate_rating: String,
    rating_test: String
  }
  average_cost_for two: Number,
  currency: String
})

let Fav  = mongoose.model('Fav', favSchema)
module.exports = Fav