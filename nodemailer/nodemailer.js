const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'celestialpalace4@gmail.com',
        pass: 'mbHtzZhrAXQRGjpk'
    }
});
module.exports={transporter};