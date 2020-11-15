"use strict";

const { v4: uuidv4 } = require("uuid");

const S3BUCKET = "slashbin-image-temp";

// set name for file to uplad
const _setName = (original) => {
  const ext = original.substring(original.lastIndexOf("."));
  const name = uuidv4();
  return `${name}${ext}`;
};

// Class
class Images {
  constructor() {}

  // set name for file to uplad
  setName(original) {
    const name = _setName(original);
    return { filename: name, bucket: S3BUCKET };
  }
}

module.exports = Images;
