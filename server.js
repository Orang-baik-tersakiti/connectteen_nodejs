const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const musicRouter = require("./routes/music.routes");
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const articleRouter = require("./routes/article.routes");
const eventRouter = require("./routes/event.routes");

const app = express();

/* =================== MIDDLEWARE =================== */
app.use(cors({
  origin: [
    "https://connectteen.vercel.app",
    "http://localhost:3000",
    "https://connectteenedu.com",
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

/* =================== DATABASE =================== */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log("MongoDB connected");
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "DB connection failed" });
  }
});

/* =================== ROUTES =================== */
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/api", musicRouter);
app.use("/api/auth", authRouter);
app.use("/api", messageRouter);
app.use("/api", articleRouter);
app.use("/api", eventRouter);

export default app;
