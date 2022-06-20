const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login', {
    loginFail: req.flash('loginFail'),
    registerSuccess: req.flash('registerSuccess')
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  if (!name || !email || !password || !confirmedPassword) {
    req.flash('somethingMissing', '請確認所有欄位皆已填寫，再送出')
    return res.render('register', {
      name,
      email,
      password,
      confirmedPassword,
      somethingMissing: req.flash('somethingMissing')
    })
  }

  if (password !== confirmedPassword) {
    req.flash('wrongConfirmedPassword', '確認密碼不符，請重新輸入')
    return res.render('register', {
      name,
      email,
      password,
      wrongConfirmedPassword: req.flash('wrongConfirmedPassword')
    })
  }

  User.findOne({ email })
    .then(user => {
      // find same email account
      if (user) {
        req.flash('existEmail', '該email已註冊，請重新檢查')
        return res.render('register', {
          name,
          email,
          password,
          confirmedPassword,
          existEmail: req.flash('existEmail')
        })
      }

      // can't find same account, so establish account
      User.create({ name, email, password })
        .then(() => {
          req.flash('registerSuccess', '您已成功註冊，請登入帳號')
          res.redirect('/users/login')
        })
    })
    .catch(err => console.err(err))
})

module.exports = router
