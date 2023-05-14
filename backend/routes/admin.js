var express = require("express");
var router = express.Router();
const db = require("../connection");
const jwt = require("jsonwebtoken");
const AdminAuth=require('../Adminmiddleware')
const adminDetails = {
  name: "admin",
  email: "admin@gmail.com",
  password: "admin123",
};

router.get("/login", (req, res) => {
  res.json("adminlogin");
});


router.post("/login", (req, res) => {
  let adminData = req.body;
  let adminName=adminDetails.name
  console.log(adminData);
  if (
    adminData.email === adminDetails.email &&
    adminData.password === adminDetails.password
  ) {

    const accessToken = jwt.sign(
        {  AdminName: adminDetails.name,email:adminDetails.email, role: "Admin" },
        "secrete",
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { AdminName: adminDetails.name,email:adminDetails.email, role: "Admin" },
        "secrete",
        {
          expiresIn: "1day",
        }
      );

    res.json({ status: true, message: "Logged In Successfully",adminAccessToken:accessToken,adminRefreshToken:refreshToken,adminName });
  } else {
    res.json({ status: false, message: "Email & Password Are Incorrect" });
  }
});

router.get("/",AdminAuth.authenticateToken, async (req, res) => {
  let adminName=adminDetails.name
   console.log(adminName);
  await db.User.find().then((response) => {
    res.json({response,adminName:adminName})
  });
});

router.post('/', async(req,res)=>{

let keyword=req.body
  try {
    const users = await db.User.find({name : { $regex: new RegExp(keyword, 'i') } })
  
    if (users.length > 0) {
     console.log(users);
    } else {
     console.log(users);
    }
  } catch (err) {
   
  }
})


router.delete('/:id', async(req,res)=>{
  let userId=req.params.id
  await db.User.deleteOne({_id:userId}).then((response)=>{
    res.json({UpdateStatus:true})
  })
})
module.exports = router;
