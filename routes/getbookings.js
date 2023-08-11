const express=require("express");
const router=express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res)=>{
    connection.query('SELECT * from bookingforms',(err,result)=>{
        if(err)
        {
            console.log(err);
        }else
        {
            res.send(result);
        }
    })
})
module.exports=router;