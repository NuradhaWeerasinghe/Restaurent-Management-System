const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    stockId:{
        type:String,
        required: true
    },
    stockType:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    rcvQuan:{
        type:Number,
        required:true
    },
    remQuan:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    rcvDate:{
        type:Date,
        required:true
    },
    expDate:{
        type:Date,
        required:true
    },
    supId:{
        type:String,
        required:true
    },
    sOrderId:{
        type:String,
        required:true
    },
    imgLink:{
        type:String,
    }

});

module.exports = mongoose.model('Posts',postSchema);