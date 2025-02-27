import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    //Function defines where to store
    destination(req, file, cb) {
        cb(null, 'uploads/'); //null - no error, cb - callback function
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` //set new name for the file
        );
    }
});

function checkFileType(file, cb) {
    const allowedFileTypes = /jpe?g|png|webp/; //allow some formats only
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const extname = allowedFileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = mimetypes.test(file.mimetype);

    console.log(`This is mimetype: ${mimetype}`);
    //If tests approved
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb('Image Only!', false);
}

const upload = multer({ storage, checkFileType });
const uploadSingleImage = upload.single('image');

//set endpoint for upload, name file's "fieldname" to image and do:
router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            res.status(400).send({ message: err.message });
        }
        res.send({
            message: 'Image uploaded',
            image: `/${req.file.path}`
        });
    });
});

export default router;
