const express = require('express')
const router = express.Router()
const {verifyToken} = require('../Middleware/verifyToken.js')
const protectedRoutes = require('../controllers/protectedController.js') 
router.post('/',verifyToken,protectedRoutes.LoginRegisterCallback)
module.exports = {router}