const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    index: true,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Expense', expenseSchema)