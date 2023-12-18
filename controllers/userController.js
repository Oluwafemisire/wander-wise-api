const bcrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken')

const User = db.users;

const signup = async (req, res) => {
    try{
        const {userName, email, password} = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        }

        const user = await User.create(data);

        if (user){
            let token = jwt.sign({id:user.id}, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })

            res.cookie('jwt', token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })
            console.log('user', JSON.stringify(user, null, 2))
            console.log(token)
            return res.status(201).send({user,token})
        }
        else{
            return res.status(409).send('Details are not correct')
        }
    } catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({
            where:{
                email: email
            }
        })

        if(user){
            const isSame = await bcrypt.compare(password, user.password)
            if (isSame){
                let token = jwt.sign({id: user.id}, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000 
                })

                res.cookie('jwt', token, {maxAge:1 * 24 * 60 * 60 * 1000, httpOnly: true})
                console.log('user', JSON.stringify(user, null, 2))
                console.log(token)

                return res.status(201).send({user, token})
            }
            else{
                return res.status(401).send('Incorrect Password')
            }

        }
        else{
            return res.status(401).send('No user found')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    signup,
    login,
}
