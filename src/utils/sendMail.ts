import nodeMailer from 'nodemailer'

const sendMail = async (email:string,subject:string,text:string)=> {
    try {
        const transporter = nodeMailer.createTransport({
            host:process.env.HOST,
            port:587,
            secure:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            },
        });

        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text,
        });
        console.log("email sent successfully")
    } catch (error) {
        console.log(error, "email not sent");
    }
}


export default sendMail;