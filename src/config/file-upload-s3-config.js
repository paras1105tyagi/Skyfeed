import multer from 'multer';
import multers3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv'; 
import path from 'path';   
dotenv.config();

aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
});


const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req,file,cb){
            cb(null,{fieldName: file.fieldname });
        },
       key: function (req, file, cb) {
            const ext = path.extname(file.originalname); // get .png / .jpg
            const filename = "tweet"+Date.now().toString() + ext; // unique + extension
            cb(null, filename);
        }
    })
});

export default upload;



