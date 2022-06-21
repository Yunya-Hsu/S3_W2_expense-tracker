// 依情況設定環境變數process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const helpers = require('handlebars-helpers')
const multiHelpers = helpers()

const port = process.env.PORT
const router = require('./routers/index')
const usePassport = require('./config/passport')

// 與mongoDB連線
require('./config/mongoose')

const app = express()

// 使用handlebars
app.engine('handlebars', exphbs({ helpers: multiHelpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({ // 使用session
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash()) // 使用connect-flash
app.use(express.urlencoded({ extended: true })) // 設定body-parser(解析post傳回來的req，body-parser已包在express中)
app.use(methodOverride('_method')) // 設定每一筆請求都會透過method-override進行前置處理
app.use((req, res, next) => { // 自訂一個全部使用的middleware，把isAuthenticated和user資料狀態傳給res.locals使用
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 啟動路由
app.use(router)

// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
