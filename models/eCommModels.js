const bcrypt = require('bcrypt')
const netPool = require('../config/db.js')
async function checkUserExists (data) {
    const queryAnswer = await netPool.pool.query(`SELECT * FROM users WHERE username=?`,[data.username])
    return queryAnswer[0]
}
async function addNewUser (data) {
    const hashPassword = await bcrypt.hash(data.password,10)
    const [queryAnswer] = await netPool.pool.query(`INSERT INTO users(username,email,contactNo,password) 
        VALUES (?,?,?,?)`,
        [data.username,data.email,data.contactNo,hashPassword])
    return queryAnswer.affectedRows
}
async function findUserByUsername (data) {
    const [rows] = await netPool.pool.query(`SELECT * FROM users WHERE username=?`,[data.username])
    return rows[0]
}
module.exports = {checkUserExists,addNewUser,findUserByUsername}