const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const newExpense = req.body
  newExpense.userId = 'test123'
  Expense.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
