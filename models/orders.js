const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({//Create schema for creating an order
    orderId: {
        type : String,
        required : true//Backend validtion 
    }, 

    total:{
        type :Number,
        required : true //Backend validtion 
    },

    deliveryMethod: {
        type : String,
        required : true //Backend validtion 
    }, 

    paymentMethod: {
        type : String,
        required : true //Backend validtion 
    },  
});
module.exports = mongoose.model('Orders',orderSchema);