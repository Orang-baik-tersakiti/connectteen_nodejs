const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const musicRouter = require("./routes/music.routes");
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const articleRouter = require("./routes/article.routes");
const eventRouter = require("./routes/event.routes");
const { getAccessToken } = require("./controllers/music.controller");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://connectteen.vercel.app",
      "http://localhost:3000",
      "https://connectteenedu.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json("Hello World");
});
app.use("/api", musicRouter);
app.use("/api/auth", authRouter);
app.use("/api", messageRouter);
app.use("/api", articleRouter);
app.use("/api", eventRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.listen(PORT, async () => {
  await getAccessToken();
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;
