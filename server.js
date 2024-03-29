const express = require('express')
const cors = require('cors')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./models')
const userRoutes = require('./routes/userRoutes')
const toeknRoutes = require('./routes/tokenRoutes')
const PORT = process.env.PORT || 8080

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(cors());

db.sequelize.sync({force:true}).then(()=>{
    console.log('db has been resync')
})

app.use('/api/users', userRoutes)
app.use('/api/hotels', toeknRoutes)

app.listen(PORT, () => console.log('server is connected on '+ PORT))