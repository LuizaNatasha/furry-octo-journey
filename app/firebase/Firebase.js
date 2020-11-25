
var firebaseConfig = {
    apiKey: "AIzaSyDALFsX-47mhq8FC38CpxkXUrZgRgSPVlk",
    authDomain: "cav-projeto-2229c.firebaseapp.com",
    databaseURL: "https://cav-projeto-2229c.firebaseio.com",
    projectId: "cav-projeto-2229c",
    storageBucket: "cav-projeto-2229c.appspot.com",
    messagingSenderId: "1036412537609",
    appId: "1:1036412537609:web:81e2fe2bedb89376da21d8",
    measurementId: "G-0BF5VCG31P"
}

const projectId = firebaseConfig.projectId;
const keyFilename = __dirname + '/keyfile.json';
const bucketName = firebaseConfig.storageBucket;
const mime = require('mime-types');
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage({ projectId, keyFilename });
const bucket = gcs.bucket(bucketName);
const crypto = new require('../crypto/index');

class Firebase {
    upload_anuncio(filePath, filename) {
        const uploadTo = `localImagem/${crypto.md5(filename)}.jpg`;
        const fileMime = mime.lookup(filePath);

        bucket.upload(filePath, {
            destination: uploadTo,
            public: true,
            metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
        }, function (err, file) {
            if (err) {
                console.log(err);
                return;
            }
        });
        return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(uploadTo)}`
    }
    upload_profile_photo(filePath, filename) {
        const uploadTo = `profileImage/${crypto.md5(filename)}.jpg`;
        const fileMime = mime.lookup(filePath);

        bucket.upload(filePath, {
            destination: uploadTo,
            public: true,
            metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
        }, function (err, file) {
            if (err) {
                console.log(err);
                return;
            }
        });
        return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(uploadTo)}`
    }
    
}


module.exports = new Firebase()