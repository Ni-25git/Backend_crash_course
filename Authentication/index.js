const express = require("express");
const connectDB = require("./db");
const user = require("./routes/userRoute");
const authMiddleware = require("./middleware/authMiddleware");
const message = require("./routes/messageRoutes");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;



app.use(express.json());
app.use("/user", user);
app.use("/message" , message)

app.get("/data", authMiddleware, (req, res) => {
  res.send("private data is present after login");
});






app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server is listening on PORT ${PORT} and db is connected`);
  } catch (error) {
    console.log("Error in connecting db wiith server");
  }
});
