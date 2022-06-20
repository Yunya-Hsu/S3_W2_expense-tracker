const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },

    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            req.flash('loginFail', '此帳號未被註冊。請確認輸入是否正確。')
            return done(null, false)
          }

          if (user.password !== password) {
            req.flash('loginFail', '密碼有誤，請重新輸入。')
            return done(null, false)
          }

          return done(null, user)
        })
        .catch(err => done(err, false))
    }
  ))

  passport.serializeUser((user, done) => done(null, user._id))

  passport.deserializeUser((userId, done) => {
    User.findOne({ _id: userId })
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err))
  })
}
