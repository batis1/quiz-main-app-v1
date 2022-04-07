const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const fs = require("fs");
// const { connect } = require("./db/connection");
const questionRouter = require("./routes/questionRouter");
const scoreRouter = require("./routes/scoreRouter");
const userRouter = require("./routes/user");
const wordRouter = require("./routes/wordRoute");
const lessonRouter = require("./routes/lessonsRoute");

const path = require("path");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// connect();

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initializing directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

if (!fs.existsSync("./public/others")) {
  fs.mkdirSync("./public/others");
}

// app.use(cors(["https://localhost:5000/", "https://localhost:3000/"]));
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));
// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("frontend/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send("working");
});

app.use(express.static("public"));
// app.use(fileUpload());
// // Upload Endpoint
// app.post("/upload", (req, res) => {
//   console.log(req.files);
//   console.log(req.body);
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/public/profile${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// axios.post("/score/signup"   )
app.use("/user", userRouter);
app.use("/score", scoreRouter);
app.use("/questions", questionRouter);
app.use("/words", wordRouter);
app.use("/lessons", lessonRouter);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("Online");
    // console.log(PORT);
  }
});

// "backend": "cross-env NODE_ENV=dev nodemon index.js",
// "frontend": "cd frontend && npm start",
// "dev": "concurrently \"npm run backend\" \"npm run frontend\""
