const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({//Create schema for creating an order
    itemId: {
        type : String,
        required : true//Backend validtion 
    }, 
    title: {
        type : String,
        required : true //Backend validtion 
    }, 

    price:{
        type :Number,
        required : true //Backend validtion 
    },

    description: {
        type : String,
        required : true //Backend validtion 
    }, 

    image: {
        type:String,
        required : true ,//Backend validtion 
        default :"/images/order1.jpg ",
    },
    category: {
        type : String,
        required : true //Backend validtion 
    },  
    availableSizes: {
        type:[String],
        default:["Mains"]
    },
});
module.exports = mongoose.model('Items',itemSchema);