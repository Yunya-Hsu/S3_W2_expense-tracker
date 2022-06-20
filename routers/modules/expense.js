const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense')
const Category = require('../../models/category')

// 將mongoDB 上的category 取出
let categoryIdFromDB = []
Category.find()
  .lean()
  .then(result => {
    categoryIdFromDB = result
  })
  .catch(err => console.error(err))

// show "create" page
router.get('/new', (req, res) => {
  if (categoryIdFromDB.length <= 0) {
    return console.log('Please establish category seed first!')
  }
  res.render('new', { category: categoryIdFromDB })
})

// after submit at "create" page
router.post('/new', (req, res) => {
  const newExpense = req.body

  // 檢查輸入內容
  if (!newExpense.categoryId || !newExpense.name || !newExpense.createdDate || !newExpense.amount) {
    // TODO: add connect-flash
    return res.render('new', { newExpense })
  }

  newExpense.userId = 'test123'

  Expense.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Expense.findOne({ _id })
    .then(theExpense => theExpense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// show "edit" page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Expense.findOne({ _id })
    .lean()
    .then(result => {
      res.render('edit', { result, category: categoryIdFromDB })
    })
    .catch(err => console.error(err))
})

// after submit at "edit" page
router.put('/:id', (req, res) => {
  const result = req.body
  const _id = req.params.id
  result._id = _id

  if (!result.categoryId) {
    res.render('edit', { result, category: categoryIdFromDB })
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
