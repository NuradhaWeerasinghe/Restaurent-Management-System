const router = require('express').Router();
let Vehicle = require('../models/Vehicle');



/*******************     Insert data to database     ******************/

http://localhost:8075/vehicle/add_vehicle


router.post(`/vehicle/add_vehicle`,(req,res)=>{
    let newVehicle = new Vehicle(req.body);
    newVehicle.save((err) =>{
        if(err){
            return res.status(400).json({error:err});
        }
       // alert("Vehicle Saved success");
        return res.status(200).json({
            success:"Vehicle Saved success"
        });
    });
});

/**************************************************************/


/************************     Retreive Data     ***********************/

http://localhost:8000/vehicle/  

router.get('/display_vehicle',(req,res)=>{
    Vehicle.find().exec((err,vehicle) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingVehicles:vehicle
        });
    });
});


/**************************************************************/


/************************     Update Data     ***********************/

http://localhost:8000/vehicle/update/user0122

router.put('/vehicle/update_vehicle/:id',(req,res)=>{
    Vehicle.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,vehicle)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Update succesfully"
            });
        }
    );
});

/**************************************************************/



/************************     Delete Data     ***********************/


http://localhost:8000/vehicle/delete/user0122

router.delete('/vehicle/delete_vehicle/:id',(req,res)=>{
    Vehicle.findByIdAndRemove(req.params.id).exec((err,deletevehicle)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deletevehicle
        });
    });
});


/**************************************************************/



/********************      Search by Id     *******************/

router.get("/vehicle/:id",(req,res)=>{
    let vehicleId = req.params.id;
    Vehicle.findById(vehicleId,(err,vehicle)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            vehicle
        });
    });
});


/**************************************************************/


module.exports = router;