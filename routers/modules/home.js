const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  Expense.find() // TODO: find by req.user._id
    .lean()
    .sort({ createdDate: 'desc' })
    .then(result => res.render('index', { result }))
    .catch(err => console.log(err))
})

module.exports = router
