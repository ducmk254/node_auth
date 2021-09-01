const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      unique: true,
      required: [true, "Vui lòng cung cấp username"],
    },
    email: {
      type: String,
      minlength: 6,
      required: [true, "Vui lòng cung cấp email"],
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Vui lòng nhập email hợp lệ!",
      ],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Vui lòng nhập mật khẩu"],
      select: false, // khi dùng find không show ra password
    },
    loginToken:String,
    resetPasswordToken: String, // Khi nhấn reset mật khẩu sẽ tạo ra token, giá trị token lưu ở đây
    resetPasswordExprise: Date, // thời giạn tồn tại của token này sẽ lưu ở đây
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // không sử dụng arrow func vì nó ko có context nên ko sử dụng được this
  if (!this.isModified("password")) {
    // nếu mk không bị thay đổi thì next() luôn
    next();
  }
  // nếu có thay đổi thì cần mã hoá trước khi lưu:
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt); // gán mk hiện tại thành chuỗi đã mã hoá.
  next();
});

UserSchema.methods.checkPasswords = async function (password) {
  return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
