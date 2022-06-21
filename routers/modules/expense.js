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
    req.flash('noCategory', '請先建立 category 的種子資料')
    return res.redirect('/')
  }
  res.render('new', { category: categoryIdFromDB })
})

// after submit at "create" page
router.post('/new', (req, res) => {
  const newExpense = req.body
  let selectedCategoryIcon = ''
  for (const i of categoryIdFromDB) {
    if (String(i._id) === String(newExpense.categoryId)) {
      selectedCategoryIcon = String(i.icon)
    }
  }

  // 檢查輸入內容是否都有輸入
  if (!newExpense.categoryId || !newExpense.name || !newExpense.createdDate || !newExpense.amount) {
    req.flash('somethingMissing', '請確認所有欄位皆已填寫，再送出')
    return res.render('new', {
      newExpense,
      somethingMissing: req.flash('somethingMissing'),
      category: categoryIdFromDB
    })
  }

  newExpense.userId = req.session.passport.user // 把 userId 加入要新增的資料中
  newExpense.categoryIcon = selectedCategoryIcon // 把 Icon 加入要新增的資料中

  Expense.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// delete
router.delete('/:id', (req, res) => {
  Expense.findOne({
    $and: [
      { _id: req.params.id },
      { userId: req.session.passport.user }
    ]
  })
    .then(theExpense => theExpense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// show "edit" page
router.get('/:id/edit', (req, res) => {
  if (categoryIdFromDB.length <= 0) {
    req.flash('noCategory', '請先建立 category 的種子資料')
    return res.redirect('/')
  }

  const categoryListForEdit = categoryIdFromDB

  Expense.findOne({
    $and: [
      { _id: req.params.id },
      { userId: req.session.passport.user }
    ]
  })
    .lean()
    .then(result => {
      for (const i of categoryListForEdit) {
        i.isSelectedId = String(result.categoryId)
      }
      res.render('edit', {
        result,
        category: categoryListForEdit
      })
    })
    .catch(err => console.error(err))
})

// after submit at "edit" page
router.put('/:id', (req, res) => {
  const result = req.body

  let selectedCategoryIcon = ''
  for (const i of categoryIdFromDB) {
    if (String(i._id) === String(result.categoryId)) {
      selectedCategoryIcon = String(i.icon)
    }
  }

  result._id = req.params.id
  result.categoryIcon = selectedCategoryIcon

  Expense.findOne({
    $and: [
      { _id: req.params.id },
      { userId: req.session.passport.user }
    ]
  })
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
