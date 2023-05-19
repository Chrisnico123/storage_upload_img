const router = require("express").Router();
const uploadImg = require("../helper/upload_helper.js");

router.post("/upload", async (req, res, next) => {
  try {
    const file = req.file;
    const imageUrl = await uploadImg(file);

    res.status(200).json({
      message: "upload success",
      imgUrl: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
