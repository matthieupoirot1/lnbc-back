"use strict";
exports.__esModule = true;
var multer = require("multer");
var MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../images');
    },
    filename: function (req, file, callback) {
        var name = file.originalname.split(' ').join('_');
        // @ts-ignore
        var extension = MIME_TYPES[file.mimetype];
        console.log('ùùù*************************** trying to uplaod !');
        callback(null, name + Date.now() + '.' + extension);
    }
});
function getMulterMiddleware() {
    return multer({ storage: storage }).single('image');
}
exports["default"] = getMulterMiddleware;
