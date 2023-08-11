const express=require("express");
const router=express.Router();
 const {transporter}=require('../nodemailer/nodemailer');
 const {connection}=require('../database/sql');
router.post('/',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const cnic=req.body.cnic;
    const phone=req.body.phone;
    const numOfChildren=req.body.numOfChildren;
    const numOfAdults=req.body.numOfAdults;
    const checkInDate=req.body.checkInDate;
    const checkOutDate=req.body.checkOutDate;
    const roomType=req.body.roomType;
    const creditCardNumber=req.body.creditCardNumber;
    const cvc=req.body.cvc;
    const mailOption={
        from:`Celestial Palace <manager@celestialpalace.com>`,
        to:email,
        subject:"Booking Pending",
        html:`<p>Dear ${name},<br>Thank You for selecting Celestial Palace! We have received your request for reservation of<strong> ${roomType} room </strong>at Celestial Palace. Your Booking is pending to be approved by the Manager. Once approved we'll let you know by this email.<br>Your Booking Details are:<br>
        <strong>Name:</strong> ${name}<br>
        <strong>Check-in Date:</strong> ${checkInDate}<br>
        <strong>Check-out Date:</strong> ${checkOutDate}<br>
        <strong>Room Type:</strong> ${roomType}<br>
        <strong>Number of Adults:</strong> ${numOfAdults}<br>
        <strong>Number of Children:</strong> ${numOfChildren}<br>
        <strong>Contact Email:</strong> ${email}<br>
        <strong>Credit Card Number:</strong> ${creditCardNumber}<br>
        <strong>CVC:</strong> ${cvc[0]+cvc[1]+cvc[2]}<br>
        <p>If there is any mistake in your booking details please contact Celestial Palace management as soon as possible.We look forward to providing you with exceptional service and a delightful experience. See you soon!<br>
        Regards,<br>
        Celestial Palace.</p>`,
    }
    const data={
        name:name,
        email:email,
        cnic:cnic,
        phone:phone,
        numOfChildren:numOfChildren,
        numOfAdults:numOfAdults,
        checkInDate:checkInDate,
        checkOutDate:checkOutDate,
        roomType:roomType,
        creditCardNumber:creditCardNumber,
        cvc:cvc,
    }
    connection.query('INSERT into bookingforms SET ?',data,(error,result)=>{
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
                    console.log("Booking Pending Email sent");
                }
            })
            res.redirect('http://localhost:3000/booking');
        }
    })
    
    // console.log(name,email,cnic,phone,numOfChildren,numOfAdults,checkInDate,checkOutDate,roomType);
})
module.exports=router;