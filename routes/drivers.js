const router = require("express").Router();
let Driver = require('../models/Driver');

/*******************     Insert data to database     ******************/

http://localhost:8000/driver/add_driver

router.post(`/driver/add_driver`,(req,res)=>{
    let newDriver = new Driver(req.body);
    newDriver.save((err) =>{
        if(err){
            return res.status(400).json({error:err});
        }
       // alert("Driver Saved success");
        return res.status(200).json({
            success:"Driver Saved success"
        });
    });
});

/**************************************************************/


/************************     Retreive Data     ***********************/

http://localhost:8000/driver/  

router.get('/display_driver',(req,res)=>{
    Driver.find().exec((err,drivers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingDrivers:drivers
        });
    });
});

/**************************************************************/


/************************     Update Data     ***********************/

http://localhost:8000/driver/update/user0122

router.put('/driver/update_driver/:id',(req,res)=>{
    Driver.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,driver)=>{
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

http://localhost:8000/driver/delete/user0122

router.delete('/driver/delete_driver/:id',(req,res)=>{
    Driver.findByIdAndRemove(req.params.id).exec((err,deletedriver)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deletedriver
        });
    });
});

/**************************************************************/


/********************      Search by Id     *******************/

router.get("/driver/:id",(req,res)=>{
    let driverId = req.params.id;
    Driver.findById(driverId,(err,driver)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            driver
        });
    });
});


/**************************************************************/


module.exports = router;