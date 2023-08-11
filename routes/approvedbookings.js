const express = require("express");
const router = express.Router();
const {connection} = require("../database/sql");
const {transporter}=require('../nodemailer/nodemailer');
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const approvedBookingData = req.body;
  const mailOption={
    from:`Celestial Palace Hotel & Resort <manager@celestialpalace.com>`,
    to:approvedBookingData.email,
    subject:"Booking Approved",
    html:`<p>Dear ${approvedBookingData.name},<br>Congratulations! We are happy to inform you that you booking has been approved at Celestial Palace.<br>Your Booking Details are:<br>
    <strong>Name:</strong> ${approvedBookingData.name}<br>
    <strong>Check-in Date:</strong> ${approvedBookingData.checkInDate}<br>
    <strong>Check-out Date:</strong> ${approvedBookingData.checkOutDate}<br>
    <strong>Room Type:</strong> ${approvedBookingData.roomType}<br>
    <strong>Number of Adults:</strong> ${approvedBookingData.numOfAdults}<br>
    <strong>Number of Children:</strong> ${approvedBookingData.numOfChildren}<br>
    <strong>Contact Email:</strong> ${approvedBookingData.email}<br>
    <strong>Credit Card Number:</strong> ${approvedBookingData.creditCardNumber}<br>
    <strong>CVC:</strong> ${approvedBookingData.cvc[0]+approvedBookingData.cvc[1]+approvedBookingData.cvc[2]}<br>
    ${approvedBookingData.roomType==="single"?
      "The amount of <strong>$120</strong> has been deducted from your Credit Card in booking of Single Room at Celestial Palace."
    :""}
    ${approvedBookingData.roomType==="family"?
      "The amount of <strong>$150</strong> has been deducted from your Credit Card in booking of Family Room at Celestial Palace."
    :""}
    ${approvedBookingData.roomType==="deluxe"?
      "The amount of <strong>$180</strong> has been deducted from your Credit Card in booking of Deluxe Room at Celestial Palace."
    :""}
    <br>
    <p>Enjoy your stay at Celestial Palace.<br>
    Regards,<br>
    Celestial Palace Management.</p>`,
  } 
  // Insert the approved booking data into the database
  connection.query(
    "INSERT INTO approvedbookings SET ?",
    approvedBookingData,
    (err, result) => {
      if (err) {
        console.error("Error inserting approved booking:", err);
        res.status(500).send("Error inserting approved booking");
      } else {
        // Delete the original booking from the bookings table
        connection.query(
          "DELETE FROM bookingforms WHERE id = ?",
          [id],
          (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error("Error deleting original booking:", deleteErr);
              res.status(500).send("Error deleting original booking");
            } else {
              transporter.sendMail(mailOption,(error,info)=>{
                if(error)
                {
                    console.log(error);
                }else{
                    console.log("Approved Email sent");
                }
            })
              res.status(200).send("Booking approved and data inserted"); 
            }
          }
        );
      }
    }
  );
});

module.exports = router;
