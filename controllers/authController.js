const { User } = require("../models/HomeModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // return res.status(400).json({
    //   status: false,
    //   error: "Vui lòng nhập email và mật khẩu",
    // });
    next(new ErrorResponse("Vui lòng nhập email và mật khẩu",400));
  }
  try {
    const checkUser = await User.findOne({ email }).select("+password");

    // kiểm tra xem user có tồn tại không ?
    if (!checkUser) {
      // return res.status(404).json({
      //   status: false,
      //   error: "Tài khoản không tồn tại trên hệ thống",
      // });
      next(new ErrorResponse("Tài khoản không tồn tại trên hệ thống",404));
    }
    // kiểm tra mật khẩu có đúng ko ?
    const isMathPassword = await checkUser.checkPasswords(password);
    if (!isMathPassword) {
      // return res.status(404).json({
      //   status: false,
      //   error: "Mật khẩu không đúng !!!",
      // });
      next(new ErrorResponse("Mật khẩu không đúng !!!",404));
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
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    // tạo token:
    const authToken = await jwt.sign(
      { userID: checkUser._id },
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
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {};

module.exports.forgotpassword = async (req, res, next) => {};
