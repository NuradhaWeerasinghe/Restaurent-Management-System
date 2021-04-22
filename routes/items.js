const express = require('express');

const Items = require('../models/items');

const router = express.Router();
//save Item
router.post(`/item/save`,(req,res)=>{
    let newItem = new Items(req.body);
    newItem.save((err) =>{
        if(err){
            return res.status(400).json({
error:err
            });
        }
       // alert("Item Saved success");
        return res.status(200).json({
            success:"Item Saved success"
        });
    });
});

//get Items
router.get('/items',(req,res)=>{
    Items.find().exec((err,items) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingItems:items
        });
    });
});

//update
router.put('/item/update/:id',(req,res)=>{
    Items.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,item)=>{
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
router.delete('/item/delete/:id',(req,res)=>{
    Items.findByIdAndRemove(req.params.id).exec((err,deleteItem)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
        return res.json({
            message:"Delete success",deleteItem
        });
    });
});

//get specific item
router.get("/item/:id",(req,res)=>{
    let itemId = req.params.id;
    Items.findById(itemId,(err,item)=>{
        if(err){ 
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            item
        });
    });
});

module.exports = router;