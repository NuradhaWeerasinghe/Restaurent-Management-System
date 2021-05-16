const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({

    name : {

        type : String,
        required : true // this is back end validation 

    },
    email : {
        type : String,
        required : true
    },
    address : {
        type: String,
        required : true
    },
    mobileNo : {
        type: Number,
        required : true
    },
    designation: {
        type: String,
        required : true
    },
    salary: {
        type: Number,
        required : true
    }, 
    date:{
        type:Date,
        required:true
    }


})

module.exports = mongoose.model('Employee',employeeSchema);