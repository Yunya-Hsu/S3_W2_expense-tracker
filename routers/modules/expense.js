const express = require('express')
const expense = require('../../models/expense')
const router = express.Router()

const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const newExpense = req.body
  newExpense.userId = 'test123'

  if (!newExpense.categoryId) {
    res.render('new', { newExpense })
  }

  Expense.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Expense.findOne({ _id })
    .then(theExpense => theExpense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Expense.findOne({ _id })
    .lean()
    .then(result => {
      res.render('edit', { result })
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const result = req.body
  const _id = req.params.id
  result._id = _id

  if (!result.categoryId) {
    res.render('edit', { result })
  }

  Expense.findOne({ _id })
    .then(theExpense => {
      for (const key of Object.keys(result)) {
        theExpense[key] = result[key]
      }
      return theExpense.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
