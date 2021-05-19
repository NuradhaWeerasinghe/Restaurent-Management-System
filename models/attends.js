const mongoose = require('mongoose');

const AttendSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    aTime:{
        type:Date,
        required:true
    },
    empID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
}
});
module.exports = mongoose.model('Attends',AttendSchema);