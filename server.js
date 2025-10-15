require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {verifyToken} = require('./Middleware/verifyToken.js')
const whiteList = [process.env.FRONTEND_URL] //enter allowed url's
let corsOptions = {
    origin: function(origin,callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true
}
//Middleware to parse and read cookie data
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//Middleware to allow frontend requests
app.use(cors(corsOptions))
//Middleware to read and parse json format
app.use(express.json())

app.get('/favicon.ico', (req, res) => res.status(204).end());

// //all public routes come here
// const eCommRoutes = require('./Routes/e-commRoutes.js')
// app.use('/api',eCommRoutes.router)  

// //all protected routes come below
// const protectedMainRoutes = require('./Routes/ProtectedRoutes.js')
// app.use('/api/auth',protectedMainRoutes.router)

const path = require('path');

const eCommRoutes = require(path.join(__dirname, 'Routes/e-commRoutes.js'))
const protectedRoutes = require(path.join(__dirname, 'Routes/ProtectedRoutes.js'))

//to test deployment of backend 
app.get('/api/health',(req,res) => {
    res.send('Backend working and connected successfully !')
})

//to test database connection
const netPool = require('./config/db.js')
app.get('/api/testdb', async (req,res) => {
    try {
        const [rows] = await netPool.pool.query('SELECT NOW() AS current_time;')
        res.json({msg : "Database successfully connected",time: rows[0].current_time })
    }
    catch (error) {
        res.status(500).json({msg : "Database connection failed",error : error.message})
    }
})

app.use('/api',verifyToken ,eCommRoutes.router)
app.use('/api/auth',verifyToken ,protectedRoutes.router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost: ${process.env.PORT}`)
})

module.exports = {express}
