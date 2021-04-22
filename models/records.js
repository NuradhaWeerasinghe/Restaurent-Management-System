const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        required:true
    },
    to:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true
}
});
module.exports = mongoose.model('Records',recordSchema);