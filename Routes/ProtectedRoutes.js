const express = require('express')
const router = express.Router()
const {verifyToken} = require('../Middleware/verifyToken.js')
const protectedRoutes = require('../controllers/protectedController.js')       
router.post('/',verifyToken,protectedRoutes.LoginRegisterCallback)
router.post('/contactForm',verifyToken,protectedRoutes.saveContactMessage)
router.post('/checkout',verifyToken,protectedRoutes.placeOrder)
 //so that user need not login after every reload
router.post('/verify',verifyToken,(req,res,next) => {  
    res.json({isLoggedIn:true,user:req.user})
})

module.exports = {router}