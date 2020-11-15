"use strict";

const services = require("../services");

const { getSignedPostUrl } = require("../av-aws");

// init service objects
const Images = new services.Images();

// route all prov events
const uploadImage = async (req, res) => {
  const { filename, bucket } = Images.setName(req.body.name);

  try {
    const data = await getSignedPostUrl({ bucket, filename });
    res.status(200).json({ data, filename });
  } catch (error) {
    res.catchExpress(error);
  }
};

module.exports = {
  uploadImage,
};
