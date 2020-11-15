"use strict";

// external dependencies
const AWS = require("aws-sdk");

const AWSProfile = process.env.AWSPROFILE || "default";
const env = process.env.NODE_ENV || "development";

// project dependencies
const config = require("./config.json")[AWSProfile];

// AWS init
AWS.config.update({ region: config.AWSRegion });

// check credentials
if (AWSProfile !== "default" && env === "development") {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: AWSProfile,
  });
}

// S3 init
const s3 = new AWS.S3();

// get signed url to get / put a file in a bucket
// operation is READ / WRITE
const getSignedS3Url = ({ operation, bucket, file, valid = 60 }) => {
  const params = {
    Bucket: bucket,
    Key: file,
    Expires: valid,
  };
  const op = operation === "WRITE" ? "putObject" : "getObject";
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(op, params, (err, url) => {
      if (err) reject(err);
      else resolve(url);
    });
  });
};

const getSignedPostUrl = ({ bucket, filename, valid = 60 }) => {
  const params = {
    Bucket: bucket,
    Key: filename,
    ContentType: "image/jpeg",
    Expires: valid,
  };
  return s3.getSignedUrlPromise("putObject", params);
};

module.exports = {
  getSignedS3Url,
  getSignedPostUrl,
};
