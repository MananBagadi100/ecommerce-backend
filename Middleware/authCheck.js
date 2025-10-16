function authCheck (req,res,next) {
    const token = req.cookies.jwtAuthCookie
    if (!token) {   //if the token or cookie is not present
        return res.json({msg : "New User",isLoggedIn:false})
    }
    else {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded
            return res.json({msg : "Token verified. Access Granted !",isLoggedIn:true})
        }
        catch (error) {
            return res.json({msg : "Token is invalid or expired",isLoggedIn:false})
        }
    }
}
module.exports = {authCheck}