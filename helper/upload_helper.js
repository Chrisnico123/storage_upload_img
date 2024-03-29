const googleCloud = require("../config/storage.js");
const util = require("util");
const bucketName = "staging_product";

const bucket = googleCloud.bucket(String(bucketName));

const { format } = util;

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", () => {
        reject("Failed to upload image, something wrong");
      })
      .end(buffer);
  });

module.exports = uploadImage;
