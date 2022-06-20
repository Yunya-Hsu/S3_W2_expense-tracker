if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = [
  { name: '家居物業' },
  { name: '交通出行' },
  { name: '休閒娛樂' },
  { name: '餐飲食品' },
  { name: '其他' }
]

db.once('open', () => {
  Promise.all(Array.from(
    { length: 1 },
    (_, i) => Category.insertMany(categoryList)
  ))
    .then(() => {
      console.log('Category seed is established.')
      process.exit()
    })
})
