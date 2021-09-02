const { User } = require("../models/HomeModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");


module.exports.login = async (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // return res.status(400).json({
    //   status: false,
    //   error: "Vui lòng nhập email và mật khẩu",
    // });
    return next(new ErrorResponse("Vui lòng nhập email và mật khẩu",400));
  }
  try {
    const checkUser = await User.findOne({ email }).select("+password");

    // kiểm tra xem user có tồn tại không ?
    if (!checkUser) {
      // return res.status(404).json({
      //   status: false,
      //   error: "Tài khoản không tồn tại trên hệ thống",
      // });
      return next(new ErrorResponse("Tài khoản không tồn tại trên hệ thống",404));
    }
    // kiểm tra mật khẩu có đúng ko ?
    const isMathPassword = await checkUser.checkPasswords(password);
    if (!isMathPassword) {
      // return res.status(404).json({
      //   status: false,
      //   error: "Mật khẩu không đúng !!!",
      // });
      return next(new ErrorResponse("Mật khẩu không đúng !!!",404));
    }
    // tạo token:
    const authToken = await jwt.sign(
      { userID: checkUser._id },
      process.env.privateKey,
      {expiresIn:process.env.JWT_EXP}
    );
    // trả về kết quả true và authToken
    return res.status(200).json({
      status: true,
      token: authToken,
    });
  } catch (error) {
    // return res.status(500).json({
    //   status: false,
    //   error: error.message,
    // });
    return next(error);
  }
};

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    // tạo token:
    const authToken = await jwt.sign(
      { userID: user._id },
      process.env.privateKey,
      {expiresIn:process.env.JWT_EXP}
    );

    return res.status(201).json({
      status: true,
      token:authToken
    });
  } catch (error) {
    // return res.status(500).json({
    //   status: false,
    //   error: error.message,
    // });
    return next(error);
  }
};

module.exports.forgotpassword = async (req, res, next) => {
  // lấy email từ người dùng nhập vào:
  const {email} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user){ // neu khong ton tai user voi email tuong ung thi tra ve loi
      return next(new ErrorResponse("Email could not be sent",404));
    }
    console.log(user);
    // neu ton tai thi lam tiep:
    const resetToken = user.getResetPasswordToken(); // lay ma resetToken duoc tao ra trong User.methods
    await user.save(); // luu resetToken vua duoc tao ra vao db

    // tao cac thong tin de cbi gui email cho user:
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
      <h1>Bạn có yêu cầu reset mật khẩu</h1>
      <p>Vui lòng truy cập link để thực hiện đặt lại mật khẩu cho tài khoản của bạn</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    // Send email:
    try {
      // tao email sender:
      console.log("...tesst...111")
      await sendEmail({
        to:user.email,
        subject:"Node_auth-Khôi phục mật khẩu tài khoản",
        text:message
      });
      console.log("...tesst...222")
      res.status(200).json({
        status:true,
        message:"Email sent"
      })
    } catch (error) {
      // truoc khi bao loi thi can xoa token di va luu thong tin user vao db
      user.resetPassword = undefined;
      user.resetPasswordToken = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not send",500));
    }
  } catch (error) {
    return next(new ErrorResponse(error.message,500));
  }
};

module.exports.resetPassword = async (req, res, next) => {};


