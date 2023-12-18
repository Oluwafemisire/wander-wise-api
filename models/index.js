const {Sequelize, DataTypes} = require('sequelize')

const DATABASE_URL = process.env.DATABASE_URL

const sequelize = new Sequelize(DATABASE_URL, {dialect:'postgres', dialectOptions:{ssl:{
    require: true,
    rejectUnauthorized:false
}}})

sequelize.authenticate().then(() => {
    console.log('Database connected to discover')
}).catch((err)=>{
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel') (sequelize, DataTypes)

module.exports = db