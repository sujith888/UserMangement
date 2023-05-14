const express = require('express');const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // set the destination folder for the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // set the filename to be the original name of the uploaded file
  }
});
module.exports={
  upload : multer({ storage: storage }),
}