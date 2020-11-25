const multer = require('multer');

module.exports = {
    storage: multer.diskStorage({}),
    
    limits:{
        fileSize: 5*1024*1024,
    },
    fileFilter: (req,file,cb)=>{
        const allowedMime = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMime.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error("Erro"));
        }
    },
    
};