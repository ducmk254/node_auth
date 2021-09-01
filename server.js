require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
// connect DB:
connectDB();
// middleware:
app.use(express.json());
app.use("/api/auth", authRouter);
// router:

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
