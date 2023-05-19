const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const env = require("dotenv");
const uploadRoute = require("./routes/upload_routes.js");
const app = express();
env.config();

//Middle Multer File
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// app.disable("x-powered-by");
app.use(express.json());
app.use(multerMid.single("file"));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handling Route
app.use("/api/user", uploadRoute);

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: "Internal server error!",
  });
  next();
});

app.listen(3000, () => {
  console.log("server running");
});
