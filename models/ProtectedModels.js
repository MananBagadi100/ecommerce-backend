const netPool = require('../config/db.js')
async function getUserDetails (data) {
    const [queryAnswer] = await netPool.pool.query(`SELECT * FROM users WHERE username=?`,[data.username])
    return queryAnswer[0]
}

async function addNewCustomerQuery (data) {
    const {user_id,username,email,contactNo,issueType,issueMessage} = data
    const [queryAnswer] = await netPool.pool.query(`INSERT INTO userQueries(user_id,username,email,contactNo,issueType,issueMessage) VALUES (?,?,?,?,?,?)`,
        [user_id,username,email,contactNo,issueType,issueMessage])
    return queryAnswer
}

async function createNewOrder (data) {
    const [queryAnswer] = await netPool.pool.query(`INSERT INTO orders(user_id,address,payment_method,total_amount) VALUES (?,?,?,?)`,
        [data.user_id,data.userAddress,data.paymentMethod,data.total])
    return queryAnswer
}

async function createNewOrderItems (data) {
    const {order_id,prod_id,prod_title,prod_price,prod_quantity,prod_image_url} = data
    const [queryAnswer] = await netPool.pool.query(`INSERT INTO order_items(order_id,product_id,title,price,quantity,image) VALUES (?,?,?,?,?,?)`,
        [order_id,prod_id,prod_title,prod_price,prod_quantity,prod_image_url])
    return queryAnswer
    
}
module.exports = {getUserDetails,addNewCustomerQuery,createNewOrder,createNewOrderItems}