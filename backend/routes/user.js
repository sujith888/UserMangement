const express = require("express");
const db = require("../connection");
const multer = require("../multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware");

router.get("/", auth.authenticateToken, (req, res) => {
  let userName = req.username;
  res.json({ userName });
});

router.get("/signup", (req, res) => {
  res.json("hlo this me ");
});

router.post("/signup", async (req, res) => {
  let data = req.body;
  console.log(data);
  let email = data.email;
  await db.User.findOne({ email })
    .then(async (existingUser) => {
      if (existingUser) {
        console.log("false");
      } else {
        await bcrypt
          .hash(data.password, 10)
          .then(async (hashedPassword) => {
            console.log(hashedPassword);
            const users = new db.User({
              name: data.name,
              password: hashedPassword,
              email: data.email,
              phoneNumber: data.phoneNumber,
            });
            console.log(data);
            console.log("data");
            console.log(users);
            users.save();
            console.log("User created successfully");
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {});
    res.json('success fully signed')
});

router.get("/login", (req, res) => {
  res.json("its login page");
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  let loginData = req.body;

  try {
    let users = await db.User.findOne({ email: loginData.email });
    if (users) {
      await bcrypt
        .compare(loginData.password, users.password)
        .then((status) => {
          if (status) {
            userName = users.name;
            id = users._id;
            // response.status
            const accessToken = jwt.sign(
              { userId: id, username: userName, role: "User" },
              "secrete",
              {
                expiresIn: "5m",
              }
            );
            const refreshToken = jwt.sign(
              { userId: id, username: userName, role: "User" },
              "secrete",
              {
                expiresIn: "1day",
              }
            );

            res.json({
              emailStatus: true,
              Message: "success",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          } else {
            console.log("password failed");
          }
        });
    } else {
      console.log("email validation failed");
    }
  } catch (err) {}
});

router.get("/profile", auth.authenticateToken, async (req, res) => {
   let userid=req.userId
   console.log(userid);
  await db.User.findOne({_id:userid}).then((response) => {
    res.json(response);
  
  });
});
router.post(
  "/profile",
  multer.upload.single("image"),
  auth.authenticateToken,
  async (req, res) => {
    console.log(req.file.filename);
    console.log(req.username);
    let userId = req.userId;
    await db.User.updateOne(
      { _id: userId },
      {
        $set: {
          image: req.file.filename,
        },
      }
    ).then(() => {
      res.json("Your Profile Picture Is Updated Successfully");
    });
  }
);


module.exports = router;
