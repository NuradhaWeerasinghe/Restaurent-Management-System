const express = require('express');

const Orders = require('../models/orders');

const router = express.Router();
//save Order
router.post(`/order/save`,(req,res)=>{
    let newOrder = new Orders(req.body);
    newOrder.save((err) =>{
        if(err){
            return res.status(400).json({
error:err
            });
        }
       // alert("Order Saved success");
        return res.status(200).json({
            success:"Order Saved success"
        });
    });
});

//get Orders
router.get('/orders',(req,res)=>{
    Orders.find().exec((err,orders) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOrders:orders
        });
    });
});

//update
router.put('/order/update/:id',(req,res)=>{
    Orders.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,order)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"update succesfully"
            });
        }
    );
});

//delete
router.delete('/order/delete/:id',(req,res)=>{
    Orders.findByIdAndRemove(req.params.id).exec((err,deleteOrder)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deleteOrder
        });
    });
});

//get specific order
router.get("/order/:id",(req,res)=>{
    let orderId = req.params.id;
    Orders.findById(orderId,(err,order)=>{
        if(err){ 
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            order
        });
    });
});

module.exports = router;