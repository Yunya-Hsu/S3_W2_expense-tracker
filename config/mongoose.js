const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connection error.')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db
