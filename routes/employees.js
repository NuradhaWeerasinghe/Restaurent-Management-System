const express = require('express');
const employee = require('../models/employee');
//const employee = require('../models/employee');
const Employee = require('../models/employee'); //import user model

const router = express.Router(); //send http request

//crate employee 
router.post('/employee/add',(req,res)=>{

    let newEmployee = new Employee(req.body);

    newEmployee.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Employee created Successfully!"
        });

        });
});

//get employee
router.get('/employee',(req,res)=>{
    Employee.find().exec((err,employees)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEmployee: employees
        });
    }) ;          
});


//get specic post
router.get("/employee/:id",(req,res)=>{
    let eId = req.params.id;
    Employee.findById(eId,(err,employee)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            employee
        });
    });
});


//update employee
router.put('/employee/update/:id',(req,res)=>{
    Employee.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,employee)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete employee

router.delete('/employee/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id).exec((err,deletedEmployee)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedEmployee
        });

    });
});




module.exports = router;


