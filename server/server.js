const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000 || process.env.PORT

const app = express()

// App config

let DBconfig = {
  development: 'mongodb://localhost/something-cool',
  test: 'mongodb://localhost/something-cool-test'
}

mongoose.Promise = global.Promise
mongoose.connect(DBconfig[app.settings.env])
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> {
  console.log('Mongoose connection established in '+ app.settings.env)
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// App routes


// Server listen
let server = app.listen(port)
console.log(`Listening to ${port}`)

module.exports = server