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

router.get('/', (req, res) => {
  const selectedCategory = req.query.OM || 0

  if (selectedCategory) {
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
        res.render('index', {
          result,
          category: categoryIdFromDB,
          totalAmount,
          noCategory: req.flash('noCategory')
        })
      })
      .catch(err => console.log(err))
  } else {
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
