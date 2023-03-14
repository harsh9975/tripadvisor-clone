require("dotenv").config();
const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3')
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
const s3 = new aws.S3({
    region:AWS_BUCKET_REGION,
    accessKeyId:AWS_ACCESS_KEY,
    secretAccessKey:AWS_SECRET_KEY
});

const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket:AWS_BUCKET_NAME,
        metadata: function(req,file,cb){
            cb(null,{originalname:file.originalname})
        },
        key:function(req,file,cb){
            const name = Date.now()+'-'+file.originalname;
            cb(null,name)
        },
    })
})

exports.upload = upload
