const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({//Create schema for creating an order
    itemId: {
        type : String,
        required : true//Backend validtion 
    }, 
    name: {
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

    category: {
        type : String,
        required : true //Backend validtion 
    },  
});
module.exports = mongoose.model('Items',itemSchema);