const express = require('express')
const db = require("../models")

const User = db.users;

const saveUser = async (req, res, next) =>{
    try{
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        })
        if (username){
            return res.json(409).send('username already taken')
        }

        const emailCheck = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (emailCheck){
            return res.json(409).send('Authentication failed')
        }

        next();
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    saveUser,
}