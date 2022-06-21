if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Category = require('../category')
const Expense = require('../expense')
const User = require('../user')

const SEED_USER = [{
  name: 'test1',
  email: 'user1@example.com',
  password: '12345678'
}]

const SEED_EXPENSE = [
  { name: '早餐', createdDate: '2022-06-20', amount: '50', category: '餐飲食品' },
  { name: '午餐', createdDate: '2022-06-20', amount: '100', category: '餐飲食品' },
  { name: '晚餐', createdDate: '2022-06-20', amount: '135', category: '餐飲食品' }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))

      .then(user => {
        return Promise.all(Array.from(SEED_EXPENSE, seedExpense => {
          return Category.findOne({ name: seedExpense.category })
            .lean()
            .then(category => {
              return Expense.create({
                name: seedExpense.name,
                amount: seedExpense.amount,
                categoryId: category._id,
                userId: user._id,
                createdDate: seedExpense.createdDate,
                categoryIcon: category.icon
              })
            })
        }))
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})
