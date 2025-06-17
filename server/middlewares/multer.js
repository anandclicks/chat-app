const { createCloudinaryStorage } = require("multer-storage-cloudinary");
const cloudanary = require("cloudinary").v2;
const multer = require("multer")

cloudanary.config({
  cloud_name: process.env.CLAUDINARY_NAME,
  api_key: process.env.CLAUDINARY_API_KEY,
  api_secret: process.env.CLAUDINARY_API_SECRET,
});

const storage = createCloudinaryStorage({
  cloudinary: cloudanary,
  params: {
    folder: "/chatImages",
  },
});


const uploads = multer({storage})

module.exports = uploads