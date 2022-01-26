import multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        // @ts-ignore
        const extension: string = MIME_TYPES[file.mimetype];
        console.log('ùùù*************************** trying to uplaod !')
        callback(null, name + Date.now() + '.' + extension);
    }
});

function getMulterMiddleware(){
    return multer({storage:storage}).single('image')
}


export default getMulterMiddleware;