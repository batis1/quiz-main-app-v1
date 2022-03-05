const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const { response } = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const docs = await User.find();

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
        savedWords: req.body.username,
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
    const { username, _id, avatar, email } = docs;

    res.send({
      username,
      _id,
      email,
      avatar,
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
