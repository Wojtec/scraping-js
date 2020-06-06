require('dotenv').config();
const cloud = require('cloudinary');

cloud.config({ 
    cloud_name: process.env,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

module.exports = {

    uploadImage: async (image, cb)=>{
            await cloud.uploader.upload(image, async (result)=>{
                let url = await result.url;
                cb(url);
             });
             console.log("Image update in Cloudinary");
        
    }
}