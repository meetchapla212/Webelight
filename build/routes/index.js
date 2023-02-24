"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controllers/admin"));
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = __importDefault(require("../controllers/auth"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post("/auth", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new auth_1.default();
    console.log("req.body", _req.body);
    const response = yield controller.getAccessToken(_req);
    console.log("response", response);
    return res.send(response);
}));
router.get("/allProducts", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, true);
        const controller = new admin_1.default();
        const response = yield controller.getAllProducts();
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.post("/admin/add/product", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, true);
        const controller = new admin_1.default();
        const response = yield controller.AddProduct(_req.body);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.put("/admin/update/product", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, true);
        const controller = new admin_1.default();
        const id = _req.body.product_id;
        delete _req.body.product_id;
        const response = yield controller.UpdateProduct(_req.body, id);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.delete("/admin/delete/product", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, true);
        const controller = new admin_1.default();
        const id = _req.body.product_id;
        const response = yield controller.DeleteProduct(id);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.post("/user/cart/add/product", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, false);
        const controller = new user_1.default();
        const response = yield controller.addProduct(_req.body);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.get("/user/get/cart", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, false);
        const controller = new user_1.default();
        console.log("_req", _req.query);
        const response = yield controller.getCart(_req.query._user_id);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
router.delete("/user/cart/delete/product", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_1.verifyJwt)(_req, res, false);
        const controller = new user_1.default();
        const response = yield controller.deleteProduct(_req.body.users_product_id);
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        res.send({ message: error });
    }
}));
exports.default = router;
