const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  decode(token) {
    try {
      return jwt.verify(token, process.env.SECRET)
    } catch(err) {
      console.log(err)
    }
  },
  verify(req,res,next) {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
      if(err) {
        console.log(err)
        res.status(401).send(err)
      } else {
        next()
      }
    })
  }
}