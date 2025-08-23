import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv";


// config the cloudinary : when we upload the image it will show to the cloudinary bucket
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;