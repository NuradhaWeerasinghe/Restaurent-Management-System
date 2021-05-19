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

    phone:{
        type :Number,
        required : true //Backend validtion 
    },

    name: {
        type : String,
        required : true //Backend validtion 
    }, 
    email: {
        type : String,
        required : true //Backend validtion 
    }, 

    address: {
        type : String,
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
    status: {
        type : String,
        required : true //Backend validtion 
    }, 
    cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
},
{
    timestamps: true,
  }
);
module.exports = mongoose.model('Orders',orderSchema);