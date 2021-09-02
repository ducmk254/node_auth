const ErrorResponse = require("../utils/errorResponse");
const {User} = require("../models/HomeModel");
module.exports.private = async (req,res,next)=>{
    try {
        return res.status(200).json({
            status:true,
            users:await User.find().select("-password")
        });
    } catch (error) {
        return next(new ErrorResponse(error.message,500));
    }
}