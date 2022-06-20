const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  if (!name || !email || !password || !confirmedPassword) {
    console.log('有地方沒填')
    return res.render('register', {
      name,
      email,
      password,
      confirmedPassword
    })
  }

  if (password !== confirmedPassword) {
    console.log('兩次密碼不符')
    return res.render('register', {
      name,
      email,
      password
    })
  }

  User.findOne({ email })
    .then(user => {
      // find same email account
      if (user) {
        console.log('該email已註冊，請重新檢查', user)
        return res.render('register', {
          name,
          email,
          password,
          confirmedPassword
        })
      }

      // can't find same account, so establish account
      User.create({ name, email, password })
        .then(() => {
          res.redirect('/users/login')
        })
    })
    .catch(err => console.err(err))
})

module.exports = router
