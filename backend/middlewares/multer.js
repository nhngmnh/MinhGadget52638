import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); 
    }
});

// Cấu hình middleware upload
const upload = multer({ storage });

export default upload;
