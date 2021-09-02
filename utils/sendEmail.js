const nodemailer = require("nodemailer");
const ErrorResponse = require("./errorResponse");
const sendEmail = async (options,next)=>{
    
    try {
        const transporter = await nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            // service: process.env.EMAIL_SERVICE,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        });
    
        const mailOptions = {
            from:"vipnho1501@gmail.com",
            to:options.to,
            subject:options.subject,
            html:options.text
        }
        console.log("...test...333");
        await transporter.sendMail(mailOptions);
        console.log("...test...444");
    } catch (error) {
        console.log(error);
        return next(new ErrorResponse(error.message,500));
    }
}

module.exports = sendEmail;