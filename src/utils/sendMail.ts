import nodeMailer from 'nodemailer'
import config from './config';
const sendMail = async (email:string,subject:string,otp:string)=> {
    try {
        const transporter = nodeMailer.createTransport({
            host: config.HOST,
            port: 2525,
            auth: {
              user:config.USER_NAME,
              pass: config.USER_PASS
            },
          
        });
       const mailOptions = {
        from:config.SENDER_EMAIL!,
        to: email,
        subject: subject,
        html: `
            <h3>Password Reset Request</h3>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>Please enter this OTP to reset your password.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
       };

     await transporter.sendMail(mailOptions);
        console.log("Your email has been sent successfully")
    } catch (error) {
        console.error(error, "email not sent");
    }
}


export default sendMail;