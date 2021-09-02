const jwt = require('jsonwebtoken');
const {User} = require("../models/HomeModel");
const ErrorResponse = require("../utils/errorResponse");


module.exports.protect = async(req,res,next)=>{
    // Dùng để check xem đã login chưa ? phải login mới vào được các route mà gán middleware này
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // Bearer ahfahfakfhafalf234324lkhafhaf : mmã token
        token = req.headers.authorization.split(" ")[1];

    }
    if(!token){
        return next(new ErrorResponse("Not authorization to access this route",401));
    }
    try {
        const decoded = await jwt.verify(token,process.env.privateKey);
        console.log(decoded);
        const user = await User.findById(decoded.userID);
        
        if(!user){
            return next(new ErrorResponse(`No user found with this id: ${decoded.userId}`,404));
        }

        req.user = user;
        console.log("....test.....")
        return next();

    } catch (error) {
        return next(new ErrorResponse("Not authorization to access this route",404));
    }
}