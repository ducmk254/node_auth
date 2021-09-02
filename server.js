require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
const authRouter = require("./routes/auth");

const errorHandle = require("./middleware/error");
// connect DB:
connectDB();
// middleware:
app.use(express.json());
app.use("/api/auth", authRouter);

app.use("*",(req,res)=> {
  return res.status(501).json({status:false,error:'Route not found'});
});
// error:
app.use(errorHandle);
// start server:
const server = app.listen(PORT, () =>
  console.log(`Server is started with ${PORT} port...`)
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Lỗi: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
