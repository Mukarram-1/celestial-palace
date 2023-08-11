const express=require("express");
const router=express.Router();
const {connection}=require('../database/sql')
router.post('/',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const cnic=req.body.cnic;
    const phone=req.body.phone;
    const designation=req.body.designation;
    const salary=req.body.salary;
    const data={
        name:name,
        email:email,
        cnic:cnic,
        phone:phone,
        designation:designation,
        salary:salary,
    }
    connection.query('INSERT into employees SET ?',data,(error,result)=>{
        if(error)
        {
            console.log(error);
        }else
        {
            console.log("Employee Added");
            res.redirect('http://localhost:3000/addemployee');
        }
    })
})
module.exports=router;