const mongoose = require('mongoose');

const vehicleScheema= new mongoose.Schema({

    vehicleNo:{
        type:String,
        require: true
    },
    modelName:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    owner:{
        type:String,
        require:true
    },
    registerDate:{
        type:Date,
        require:true
    }
})

//export Vehicle model for routers usage
module.exports = mongoose.model("Vehicle", vehicleScheema);


