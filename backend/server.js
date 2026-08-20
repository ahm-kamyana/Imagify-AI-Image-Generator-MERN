const dotenv = require("dotenv");
dotenv.config();
// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb.js");
const userRouter = require("./routes/userRoutes.js");
const imageRouter = require("./routes/imageRoutes.js");

const PORT = process.env.PORT || 8080;
const app = express(); 

app.use(cors());
app.use(express.json());
connectDB();
app.use("/user",userRouter)
app.use("/image",imageRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});


app.listen(PORT, () => {
  console.log("Server is runing on port ", PORT);
});
 