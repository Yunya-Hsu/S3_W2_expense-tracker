// 依情況設定環境變數process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const port = process.env.PORT
const router = require('./routers/index')

// 與mongoDB連線
require('./config/mongoose')

const app = express()

// 使用handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true })) // 設定body-parser(解析post傳回來的req，body-parser已包在express中)
app.use(methodOverride('_method')) // 設定每一筆請求都會透過method-override進行前置處理

// 啟動路由
app.use(router)

// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
