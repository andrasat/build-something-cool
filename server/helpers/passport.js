const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

passport.use(new localStrategy({
    usernamefield: 'email',
    passwordField: 'password',
    session: false
  },
  (username, password, done)=> {
    User.findOne({email: username}, (err,user)=> {
      if(err) done(err)
      if(!user) done(null, false)
      bcrypt.compare(password, user.password, (err,res)=> {
        if(err) done(err)
        if(!res) done(null, false)
        done(null, user)
      })
    })
  }
))