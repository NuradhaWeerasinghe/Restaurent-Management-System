const router = require("express").Router();
let Delivery = require('../models/Delivery');

/*******************     Insert data to database     ******************/

http://localhost:8000/delivery/add_delivery

router.post(`/delivery/add_delivery`,(req,res)=>{
    let newDelivery = new Delivery(req.body);
    newDelivery.save((err) =>{
        if(err){
            return res.status(400).json({error:err});
        }
       // alert("Driver Saved success");
        return res.status(200).json({
            success:"delivery Saved success"
        });
    });
});

/**************************************************************/


/************************     Retreive Data     ***********************/

http://localhost:8000/delivery/  

router.get('/display_delivery',(req,res)=>{
    Delivery.find().exec((err,deliveries) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingDeliveries:deliveries
        });
    });
});

/**************************************************************/


/************************     Update Data     ***********************/

http://localhost:8000/delivery/update/user0122

router.put('/delivery/update_delivery/:id',(req,res)=>{
    Delivery.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,delivery)=>{
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


/********************      Search by Id     *******************/

router.get("/delivery/:id",(req,res)=>{
    let orderNo = req.params.id;
    Delivery.findById(orderNo,(err,delivery)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            delivery
        });
    });
});


/**************************************************************/


module.exports = router;