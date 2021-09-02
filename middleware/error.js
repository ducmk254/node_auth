const ErrorResponse = require("../utils/errorResponse");
const errorHandle = (err,req,res,next)=>{
    let error = {...err};

    error.message = err.message;

    if(err.code === 11000){
        const message = `Lỗi trùng email hoặc username`;
        err = new ErrorResponse(message,400);
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val=>val.message);
        err = new ErrorResponse(message,400);
    }

    return res.status(err.statusCode || 500).json({
        status:false,
        error: err.message || 'Server Error'
    })
}

module.exports = errorHandle;