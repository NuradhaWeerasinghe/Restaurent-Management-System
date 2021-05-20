const mongoose = require('mongoose');

const deliveryScheema= new mongoose.Schema({

    orderNo:{
        type: String,
        require: true
    },
    custName:{
        type: String,
        require: true
    },
    total:{
        type: Number,
        default: 0.0,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    orderDate:{
        type: Date,
        default: Date.now(),
        require: true
    },
    driverNo:{
        type: String,
        require: true
    },
    status:{
        type: String,
        default: 'Pending',
        require: true
    }

})

//export Driver model for routers usage
module.exports = mongoose.model("Delivery",deliveryScheema);

