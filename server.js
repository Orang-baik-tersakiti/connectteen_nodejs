const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const musicRouter = require("./routes/music.routes");
const authRouter = require('./routes/auth.routes')

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((error) => console.log(error));

const app = express();
// const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://connectteen.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: [
    //   "Content-Type",
    //   "Authorization",
    //   "Cache-Control",
    //   "Expires",
    //   "Pragma",
    // ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("Hello World");
});
app.use("/api", musicRouter);
app.use("/api/auth", authRouter);

// app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
module.exports = app