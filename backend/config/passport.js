const passport = require('passport')
const passportJwt = require('passport-jwt')
const User = require('../models/Users')
const { Strategy, ExtractJwt } = passportJwt

require('dotenv').config()

const params = {
      secretOrKey: process.env.AUTH_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, (payload, done) => {
      try {
        User.findOne({email: payload.email})
        .then(user => done(null, user ? {...payload} : false))
      } catch (error) {
        error => done(error, false) 
      }
  })

    passport.use(strategy)

    authentication = () => passport.authenticate('jwt', {session:false})

module.exports = {authentication}
