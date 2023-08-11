// api/routes/deletebooking.js
const express = require('express');
const router = express.Router();
const {connection} = require('../database/sql');
const {transporter}=require('../nodemailer/nodemailer');
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const rejectedBookingData = req.body;
  const mailOption={
    from:`Celestial Palace Hotel & Resort <manager@celestialpalace.com>`,
    to:rejectedBookingData.email,
    subject:"Booking Rejected",
    html:`<p>Dear ${rejectedBookingData.name},<br>We hope this email finds you well. We regret to inform you that your recent booking request at Celestial Palace has been rejected due to unavailablity of rooms.<br>Your Booking Details are:<br>
    <strong>Name:</strong> ${rejectedBookingData.name}<br>
    <strong>Check-in Date:</strong> ${rejectedBookingData.checkInDate}<br>
    <strong>Check-out Date:</strong> ${rejectedBookingData.checkOutDate}<br>
    <strong>Room Type:</strong> ${rejectedBookingData.roomType}<br>
    <strong>Number of Adults:</strong> ${rejectedBookingData.numOfAdults}<br>
    <strong>Number of Children:</strong> ${rejectedBookingData.numOfChildren}<br>
    <strong>Contact Email:</strong> ${rejectedBookingData.email}<br>
    <strong>Credit Card Number:</strong> ${rejectedBookingData.creditCardNumber}<br>
    <strong>CVC:</strong> ${rejectedBookingData.cvc[0]+rejectedBookingData.cvc[1]+rejectedBookingData.cvc[2]}<br>We sincerely apologize for any inconvenience this may have caused. Unfortunately, due to unforeseen circumstances, we are unable to accommodate your reservation at this time. If you have already made a payment, a full refund will be processed within the next <strong>3 Working days</strong> to the original payment method.<br>
    Best Regards,<br>
    Celestial Palace Management.`,
  }
  connection.query('DELETE FROM bookingforms WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Error deleting booking' }); // Send JSON response
    } else {

      res.status(200).json({ message: 'Booking deleted successfully' }); // Send JSON response
      transporter.sendMail(mailOption,(error,info)=>{
        if(error)
        {
            console.log(error);
        }else{
            console.log("Rejection Email sent");
        }
    })
    }
  });
});
module.exports = router;
