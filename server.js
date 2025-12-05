const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const musicRouter = require("./routes/music.routes");

// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB Connected 🚀"))
//   .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
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

// Routes
app.use("/api", musicRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
