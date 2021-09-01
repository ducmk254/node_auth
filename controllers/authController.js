const { User } = require("../models/HomeModel");
const jwt = require("jsonwebtoken");
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      error: "Vui lòng nhập email và mật khẩu",
    });
  }
  try {
    const checkUser = await User.findOne({ email }).select("+password");

    // kiểm tra xem user có tồn tại không ?
    if (!checkUser) {
      return res.status(404).json({
        status: false,
        error: "Tài khoản không tồn tại trên hệ thống",
      });
    }
    // kiểm tra mật khẩu có đúng ko ?
    const isMathPassword = await checkUser.checkPasswords(password);
    if (!isMathPassword) {
      return res.status(404).json({
        status: false,
        error: "Mật khẩu không đúng !!!",
      });
    }
    // tạo token:
    const authToken = await jwt.sign(
      { userID: checkUser.username },
      process.env.privateKey
    );

    // trả về kết quả true và authToken
    return res.status(200).json({
      status: true,
      token: authToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    return res.status(201).json({
      status: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports.resetPassword = async (req, res, next) => {};

module.exports.forgotpassword = async (req, res, next) => {};
