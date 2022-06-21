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

// Home page
router.get('/', (req, res) => {
  const selectedCategory = req.query.OM || 0

  if (selectedCategory) { // if user selected a category
    Expense.find({
      $and: [
        { categoryId: selectedCategory },
        { userId: req.session.passport.user }
      ]
    })
      .lean()
      .sort({ createdDate: 'desc' })
      .then(result => {
        let totalAmount = 0
        for (const i of result) {
          totalAmount += Number(i.amount)
        }
        let selectedCategoryName = ''
        for (const i of categoryIdFromDB) {
          if (String(i._id) === selectedCategory) {
            selectedCategoryName = i.name
          }
        }
        res.render('index', {
          result,
          category: categoryIdFromDB,
          totalAmount,
          noCategory: req.flash('noCategory'),
          selectedCategoryName
        })
      })
      .catch(err => console.log(err))
  } else { // show all records
    Expense.find({ userId: req.session.passport.user })
      .lean()
      .sort({ createdDate: 'desc' })
      .then(result => {
        let totalAmount = 0
        for (const i of result) {
          totalAmount += Number(i.amount)
        }
        res.render('index', {
          result,
          category: categoryIdFromDB,
          totalAmount,
          noCategory: req.flash('noCategory')
        })
      })
      .catch(err => console.log(err))
  }
})

module.exports = router
