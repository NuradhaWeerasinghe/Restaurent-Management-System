const mongoose = require('mongoose');

const driverScheema= new mongoose.Schema({

    driverNo:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    licenceNo:{
        type: String,
        require: true
    },
    nic:{
        type: String,
        require: true
    },
    mobile:{
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    }

})

//export Driver model for routers usage
module.exports = mongoose.model("Driver",driverScheema);

