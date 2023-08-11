const express=require("express");
const router=express.Router();
 const {transporter}=require('../nodemailer/nodemailer');
 const {connection}=require('../database/sql');
router.post('/',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const roomType=req.body.roomType;
    const review=req.body.review;
    const checkInDate=req.body.checkInDate;
    const checkOutDate=req.body.checkOutDate;
    const mailOption={
        from:`Celestial Palace <manager@celestialpalace.com>`,
        to:email,
        subject:"Room Review",
        html:`<p>Dear ${name},<br>Thank You for the review of <strong>${roomType} room</strong> of Celestial Palace. Your kind words are very precious to us. We will look at your suggestions and reviews.<br>Regards,<br>Celestial Palace Hotel & Resort.</p>`,
    }
    const data={
        name:name,
        email:email,
        phone:phone,
        roomType:roomType,
        checkInDate:checkInDate,
        checkOutDate:checkOutDate,
        review:review,
    }
    connection.query('INSERT into reviews SET ?',data,(error,result)=>{
        if(error)
        {
            console.log(error);
        }else
        {
            console.log("Data stored");
            transporter.sendMail(mailOption,(error,info)=>{
                if(error)
                {
                    console.log(error);
                }else{
                    console.log("Review Email sent");
                }
            })
            res.redirect('http://localhost:3000/roomreview');
        }
    })
    
    // console.log(name,email,cnic,phone,numOfChildren,numOfAdults,checkInDate,checkOutDate,roomType);
})
module.exports=router;