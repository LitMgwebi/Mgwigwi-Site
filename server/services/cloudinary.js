var cloudinary = require('cloudinary').v2;
var log = require("../config/logging");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (path, folder) => {
    return cloudinary.uploader.upload(path, {folder})
        .then((data) => {
            return{url: data.url, public_id: data.public_id};
        }).catch((error)=> {
            log.error(error);
        });
}

const removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result){
        console.log(result, error);
    });
}

module.exports = {uploadToCloudinary, removeFromCloudinary}