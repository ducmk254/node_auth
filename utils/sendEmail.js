const nodemailer = require("nodemailer");
const ErrorResponse = require("./errorResponse");
const sendEmail = async (options, next) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      // service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // console.log('transporter: ',transporter);
    const mailOptions = {
      from: "vipnho1501@gmail.com",
      to: options.to,
      subject: options.subject,
      html: options.text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, 500));
  }
};

module.exports = sendEmail;
