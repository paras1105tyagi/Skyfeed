import multer from 'multer';
import multers3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';    
dotenv.config();

aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
})

const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req,file,cb){
            cb(null,{filename: file.filename});
        },
        key: function(req,res,cb){
            cb(null,Date.now().toString())
        }
    })
});

export default upload;



