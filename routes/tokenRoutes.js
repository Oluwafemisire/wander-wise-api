const { Hotels } = require('../controllers/amaduesController')
const express = require('express')



const tokenRouter = express.Router()

tokenRouter.get('/getHotels', Hotels)

module.exports = tokenRouter