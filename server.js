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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://connectteenedu.com"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

/* =================== DATABASE =================== */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // hentikan server jika DB gagal
  }
};

/* =================== ROUTES =================== */
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/api", musicRouter);
app.use("/api/auth", authRouter);
app.use("/api", messageRouter);
app.use("/api", articleRouter);
app.use("/api", eventRouter);

/* =================== SERVER =================== */
const startServer = async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
};

startServer();

module.exports = app;
