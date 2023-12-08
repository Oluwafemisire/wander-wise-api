const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('postgresql://postgres:Tiwalade2002%40@localhost:5432/wanderwise', {dialect:'postgres'})

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