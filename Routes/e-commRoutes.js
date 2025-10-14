const express = require('express')
const router = express.Router()
const Ecomm = require('../controllers/eCommPublicController.js')      
router.post('/register',Ecomm.registerNewUser)
router.post('/login',Ecomm.loginUser)
router.get('/authenticate',Ecomm.authenticateToken)
router.post('/logout',Ecomm.logoutUser)
module.exports = {router}