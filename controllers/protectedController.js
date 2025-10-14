const protectedOperations = require('../models/ProtectedModels.js')
async function LoginRegisterCallback (req,res,next) {
    res.json({msg : "Token correct and verified. Access Granted !",isLoggedIn:true})
}
async function saveContactMessage (req,res,next) {
    const answer = await protectedOperations.getUserDetails(req.user)
    const queryMessage = {
        "user_id":answer.user_id,
        "username":answer.username,
        "email":answer.email,
        "contactNo":answer.contactNo,
        ...req.body
    }
    const addAnswer = await protectedOperations.addNewCustomerQuery(queryMessage)
    console.log('addAnswer is',addAnswer)
    if (addAnswer.affectedRows === 1) {
        res.status(200).json({msg : "Query successfully submitted !"})
    }
    else {
        res.status(500).json({msg : "Error: Some error occured. Please try again !"})
    }
}
async function placeOrder (req,res,next) {
    const userDetails = await protectedOperations.getUserDetails(req.user)
    const user_id = userDetails.user_id
    const otherDetails = req.body
    console.log('otherDetails',otherDetails)
    const ordersPayload = {
        user_id : user_id,
        userAddress : otherDetails.userAddress,
        paymentMethod : otherDetails.paymentMethod,
        total : otherDetails.total
    }
    //placing the data in orders table
    try {
        const answer = await protectedOperations.createNewOrder(ordersPayload)
        if(answer.affectedRows === 1) { //means order has been created
            const order_id = answer.insertId
            const cartItems = otherDetails.cartItems
            console.log('order id is ',order_id)
            for (let i = 0 ; i < cartItems.length ; i++) {
                const orderItemsPayload = {
                    order_id : order_id,
                    prod_id : cartItems[i].id,
                    prod_title : cartItems[i].title,
                    prod_price : cartItems[i].price,
                    prod_quantity : cartItems[i].quantity,
                    prod_image_url : cartItems[i].image
                }
                await protectedOperations.createNewOrderItems(orderItemsPayload)
            }
            res.status(200).json({msg : "Order and order items added successfully"})
        }
    }
    catch (error) {
        res.json({msg : "Order could not be placed"})
    }
    
}
module.exports = {LoginRegisterCallback,saveContactMessage,placeOrder}