import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, res, cb) {
    cb(null, "uploads/"); // null is for error
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// function checkFileType(file, cb){
//     const filetypes = /jpg|jpeg|png/;
//     const extname =filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if(extname && mimetype){
//         return cb(null, true);
//     } else{
//         cb('Images only');
//     }
// }

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}
const upload = multer({
  storage,
  fileFilter,
});
const uploadSingleImage = upload.single("image");

// router.post('/', upload.single('image'), (req,res)=>{
//     res.send({
//         message: 'Image uploaded',
//         image: `/${req.file.path}`
//     });
// })

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});
export default router;
