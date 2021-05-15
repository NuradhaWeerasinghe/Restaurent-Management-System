const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    invoiceID:{
        type:String,
        required:true
    },
    amount:{
    type:Number,
    required:true
},
accNo:{
    type:Number,
    required:true
},
pDate:{
    type:Date,
    required:true
}  
});
module.exports = mongoose.model('Bills',billSchema);