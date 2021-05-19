const express = require('express');
const Attends = require('../models/attends');
const router = express.Router();

router.post(`/attend/save`,(req,res)=>{
    let newAttends = new Attends(req.body);
    newAttends.save((err) =>{
        if(err){
            return res.status(400).json({
error:err
            });
        }
       return res.status(200).json({
            success:"Attend Saved success"
        });
    });
});

router.get('/attends',(req,res)=>{
    Attends.find().exec((err,attends) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAttends:attends
        });
    });
});

module.exports = router;