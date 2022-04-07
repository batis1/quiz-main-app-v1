const mongoose = require("mongoose");
const multer = require("multer");
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const { response } = require("express");
const { Score } = require("../models/Score");
const router = express.Router();

// upload
// create our customs upload (we need multerStorage and multerFilter)
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (file.mimetype.startsWith("image")) {
      cb(null, "public/profile");
    } else {
      cb(null, "public/others");
    }
  },
  // file is the file object that we consoled it
  filename: (req, file, cb) => {
    // user-userId-timeStamp.jpeg
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

// // we use multerFilter to check if the file image or not
// // for security propose
// // cb(error,value you want to pass)
const multerFilter = (req, file, cb) => {
  console.log({ file });

  const ext = file.mimetype.split("/")[1];
  console.log(file.mimetype);
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("audio") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new AppError("Not image file! Please upload images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUser = upload.single("file");

const handleUploadUserPhoto = (req, res) => {
  console.log(req.body);
  const { filename } = req.file;

  res.send({
    message: "Profile image uploaded successfully",

    fileName: filename,
    filePath: `/profile/${filename}`,
  });
};

router.post("/uploadProfileImage", uploadUser, handleUploadUserPhoto);

router.get("/", async (req, res) => {
  const { withScores } = req.query;

  const docs = await User.find();

  if (withScores) {
    for (let index = 0; index < docs.length; index++) {
      const lesson = docs[index];

      const wordDocs = await Score.find({ userID: lesson._id });

      docs[index] = { ...lesson._doc, scores: wordDocs };
    }
  }

  res.send({ status: "success", docs });
});

router.post("/signup", (req, res) => {
  const newUser = req.body;

  // TODO: check if user is all ready in the system
  // TODO: check if email is all ready used
  const imgBin = req.body.avatarImg
    ? new Buffer(req.body.avatarImg, "base64")
    : null;

  // hash password
  bcrypt.hash(req.body.password, 4, (err, hash) => {
    if (!err) {
      console.log("creating");
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        avatar: imgBin,
        // savedWords: req.body.username,
        imageUrl: req.body.imageUrl,
        role: req.body.role,
      })
        .then((userRecord) => {
          res.status(200).send({
            message: "Account Created",
            success: true,
            user: createClientUser(userRecord),
          });
        })
        .catch((err) => {
          console.log("Error", err);
          res
            .status(500)
            .send({ message: "Account Error", success: false, err });
        });
    } else {
      console.log("Error", err);
      res.status(500).send({ message: "Unable to hash", success: false, err });
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log({ username, password });
  User.findOne({ username }, (err, userRecord) => {
    console.log(userRecord);
    if (!userRecord) {
      res.status(200).send({ message: "User does not exist", auth: false });
    } else {
      bcrypt.compare(password, userRecord.password, (err, result) => {
        console.log(result);
        res.status(200).send({
          auth: result,
          user: createClientUser(userRecord),
        });
      });
    }
  });
});
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log({ user, savedWords: req.body.savedWords });

  const updateOptions = ["username", "savedWords"];

  for (let index = 0; index < updateOptions.length; index++) {
    const element = updateOptions[index];

    user[element] = req.body[element] ? req.body[element] : user[element];
  }

  await user.save();
  res.send({ message: "user update successfully" });
});

router.get("/:id", async (req, res) => {
  // const docs = await User.findOne({ _id: req.params.id });

  // console.log(docs);
  try {
    // res.status(404).send({});
    const docs = await User.findOne({ _id: req.params.id });

    console.log(docs);
    const { username, _id, avatar, email, imageUrl } = docs;

    res.send({
      username,
      _id,
      email,
      avatar,
      imageUrl,
      // avatar: processAvatar(avatar.toString("base64")),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fall",
      message: "something went wrong to get the user",
    });
  }

  // User.findOne({ _id: req.params.id }, (err, UserRecord) => {
  //   const { username, _id, avatar, email } = UserRecord;
  //   console.log(UserRecoded);
  //   res.send({
  //     username,
  //     _id,
  //     email,
  //     avatar,
  //     // avatar: processAvatar(avatar.toString("base64")),
  //   });
  // });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.deleteOne({ _id: id });

  res.send({ status: "deleted successfully" });
});

const createClientUser = ({ password, avatar, _id, username, ...rest }) => ({
  timeStamp: Date.now(),
  // avatar: processAvatar(avatar.toString("base64")),
  id: _id,
  username,
  ...rest,
});

const processAvatar = (imgString) => {
  if (!imgString) return null;
  const matched = [...imgString.matchAll(/image\/(\w+)base64(.+)/g)];
  return `data:image/${matched[0][1]};base64, ${matched[0][2]}`;
};

module.exports = router;
