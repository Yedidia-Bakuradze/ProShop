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
    const allowedFileTypes = /jpg|jpeg|png/; //allow some formats only
    const extname = allowedFileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    console.log(`This is mimetype: ${mimetype}`);
    //If tests approved
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb('Image Only!');
}

const upload = multer({ storage });

//set endpoint for upload, name file's "fieldname" to image and do:
router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    });
});

export default router;
