"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminJwt = exports.verifyJwt = exports.createHex = exports.createAdminJwt = exports.createUserJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
var crypto = require("crypto");
function createUserJwt(parsedBody) {
    return jsonwebtoken_1.default.sign(parsedBody, config_1.default.SECRET, {
        expiresIn: config_1.default.JWT_EXPIRATION,
    });
}
exports.createUserJwt = createUserJwt;
;
function createAdminJwt(parsedBody) {
    console.log("parseddata", parsedBody);
    return jsonwebtoken_1.default.sign(parsedBody, config_1.default.ADMIN_SECRET, {
        expiresIn: config_1.default.JWT_EXPIRATION,
    });
}
exports.createAdminJwt = createAdminJwt;
;
function createHex(value) {
    return crypto.createHmac("sha256", config_1.default.SECRET).update(value).digest("hex");
}
exports.createHex = createHex;
;
function verifyJwt(req, res, isAdmin = false) {
    try {
        const authHeader = req.body.token || req.query.token || req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log("authHeader", authHeader);
        if (authHeader) {
            var secretKey = isAdmin ? config_1.default.ADMIN_SECRET : config_1.default.SECRET;
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        else {
            res.status(404).send({ "data": { "message": "Token not found." } });
        }
    }
    catch (error) {
        res.status(400).send({ "data": { "message": "Unauthorized token." } });
    }
}
exports.verifyJwt = verifyJwt;
;
function verifyAdminJwt(req, res) {
    try {
        const authHeader = req.body.token || req.query.token || req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log("authHeader", authHeader);
        if (authHeader) {
            return jsonwebtoken_1.default.verify(token, config_1.default.ADMIN_SECRET);
        }
        else {
            res.status(404).send({ "data": { "message": "Token not found." } });
        }
    }
    catch (error) {
        res.status(400).send({ "data": { "message": "Unauthorized token." } });
    }
}
exports.verifyAdminJwt = verifyAdminJwt;
;
