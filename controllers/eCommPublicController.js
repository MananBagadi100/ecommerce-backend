const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const bcrypt = require('bcrypt')
const Operations = require('../models/eCommModels.js')  

async function registerNewUser (req,res,next) {
    //check if the user already exists in the database or not
    const exists = await Operations.checkUserExists(req.body)
    if(exists.length > 0) {
        res.json({msg:"User already exists in the database"})
    }
    else {
        const addedRows = await Operations.addNewUser(req.body)
        if(addedRows === 1) {   //user has been added successfully
            const tokenPayload = {
                "username": req.body.username,
                "email": req.body.email,
                "contactNo": req.body.contactNo
            }
            const token = jwt.sign(tokenPayload,secretKey)
            res.cookie('jwtAuthCookie',token,{httpOnly:true,secure:false,maxAge:14400000})
            res.json({msg : "User Added Successfully",isLoggedIn:true})
        }
        else {
            res.json({msg : "User could not be added due to some problem"})
        }
    }  
}

async function loginUser (req,res,next) {
    const answer = await Operations.findUserByUsername(req.body)
    try {
        if(answer) {
            const checkPassword = await bcrypt.compare(req.body.password,answer.password)
            if(checkPassword) {
                const tokenPayload = {
                    "username": req.body.username,
                    "email": req.body.email,
                    "contactNo": req.body.contactNo
                }
                const token = jwt.sign(tokenPayload,secretKey)
                res.cookie("jwtAuthCookie",token,{httpOnly:true,secure:false,maxAge:14400000,})
                res.json({msg : "Username and password are correct",isLoggedIn:true})
            }
            else {
                res.json({msg : "Password is incorrect"})
            }
        }
    
        else {
            res.json({msg : "User does not exist"})
        }
    }
    catch (error) {     //just for handling errors (if any)
        console.log('the error is ', error)
    }
}
async function logoutUser (req,res,next) {
    res.clearCookie('jwtAuthCookie',{httpOnly:true,secure:false})
    res.json({msg : "Logout Successful",isLoggedIn : false})
}

async function authenticateToken (req,res,next)  {
    const clientJWT = req.cookie.jwtAuthCookie
    if(!clientJWT) {
        res.json({msg : "JWT Access Token not found"})
    }
    jwt.sign(clientJWT,secretKey,(error,user) => {
        if(error) {
            res.json({msg : "JWT token invalid or expired",LoggedIn:false})
        }
        console.log('user value is ',user)
    })
}
module.exports = {registerNewUser,loginUser,authenticateToken,logoutUser}