const jwt = require('jsonwebtoken')
async function verifyToken (req,res,next) {
    const clientToken = req.cookies.jwtAuthCookie
    if(!clientToken) {    //if cookie not found
        return res.status(401).json({msg : "JWT Access token missing : Unauthorized Access!",isLoggedIn:false})
    }
    try {
        const decoded = jwt.verify(clientToken,process.env.JWT_SECRET)
        req.user = decoded      //attaching user info so that next route can use it 
        console.log('in verify token ',req.user)
        return next()
    }
    catch (error) {
        return res.json({msg : "Invalid token",isLoggedIn:false})
    }

}
module.exports = {verifyToken}