const express = require('express');
const Bills = require('../models/bills');

const router = express.Router();

//save bill
router.post(`/bill/save`,(req,res)=>{
    let newBill = new Bills(req.body);
    newBill.save((err) =>{
        if(err){
            return res.status(400).json({
    error:err
            });
        }
       // alert("bill Saved success");
        return res.status(200).json({
            success:"Bill Saved success"
        });
    });
});

//get bills
router.get('/bills',(req,res)=>{
    Bills.find().exec((err,bills) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingBills:bills
        });
    });
});

//update
router.put('/bill/update/:id',(req,res)=>{
    Bills.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,bill)=>{
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
router.delete('/bill/delete/:id',(req,res)=>{
    Bills.findByIdAndRemove(req.params.id).exec((err,deleteBill)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deleteBill
        });
    });
});

//get specific bill
router.get("/bill/:id",(req,res)=>{
    let billId = req.params.id;
    Bills.findById(billId,(err,bill)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            bill
        });
    });
});

module.exports = router;