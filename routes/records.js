const express = require('express');
const Records = require('../models/records');

const router = express.Router();
//save record
router.post(`/record/save`,(req,res)=>{
    let newRecord = new Records(req.body);
    newRecord.save((err) =>{
        if(err){
            return res.status(400).json({
error:err
            });
        }
       
        return res.status(200).json({
            success:"Record Saved success"
        });
    });
});

//get records
router.get('/records',(req,res)=>{
    Records.find().exec((err,records) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingRecords:records
        });
    });
});

//update
router.put('/recod/update/:id',(req,res)=>{
    Records.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,record)=>{
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
router.delete('/record/delete/:id',(req,res)=>{
    Records.findByIdAndRemove(req.params.id).exec((err,deleteRecord)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deleteRecord
        });
    });
});

//get specific record
router.get("/record/:id",(req,res)=>{
    let recordId = req.params.id;
    Records.findById(recordId,(err,record)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            record
        });
    });
});

module.exports = router;