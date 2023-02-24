import jwt from "jsonwebtoken";
import config from "./config";
var crypto = require("crypto");

export function createUserJwt(parsedBody: any) {
  return jwt.sign(parsedBody, config.SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });
};

export function createAdminJwt(parsedBody: any) {
  console.log("parseddata", parsedBody);
  return jwt.sign(parsedBody, config.ADMIN_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });
};

export function createHex(value: any) {
  return crypto.createHmac("sha256", config.SECRET).update(value).digest("hex");
};

export function verifyJwt(req: any, res: any, isAdmin = false) {
  try {
    const authHeader = req.body.token || req.query.token || req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("authHeader", authHeader);
    if (authHeader) {
      var secretKey = isAdmin ? config.ADMIN_SECRET : config.SECRET;
      return jwt.verify(token, secretKey);
    } else {
      res.status(404).send({ "data": { "message": "Token not found." } })
    }
  }
  catch (error) {
    res.status(400).send({ "data": { "message": "Unauthorized token." } })
  }
};

export function verifyAdminJwt(req: any, res: any) {
  try {
    const authHeader = req.body.token || req.query.token || req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("authHeader", authHeader);
    if (authHeader) {
      return jwt.verify(token, config.ADMIN_SECRET);
    } else {
      res.status(404).send({ "data": { "message": "Token not found." } })
    }
  }
  catch (error) {
    res.status(400).send({ "data": { "message": "Unauthorized token." } })
  }
};