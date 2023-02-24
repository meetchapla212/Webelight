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
const moment_1 = __importDefault(require("moment"));
const dbmanager_1 = __importDefault(require("../common/dbmanager"));
const DBManager = new dbmanager_1.default();
const dateFormat = "YYYY-MM-DD HH:mm:ss";
// @Route("ping")
class ProductController {
    // @Get("/")
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var resultUser = yield DBManager.runQuery(`SELECT * FROM product_master INNER JOIN category_master on product_master._category_id = category_master.category_id`);
                var rowUser = resultUser.rows || [];
                console.log("rowuser", rowUser);
                if (rowUser.length > 0) {
                    return rowUser;
                }
                else {
                    return {
                        message: "Product not found."
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                data.date_created = moment_1.default.utc().format(dateFormat);
                yield DBManager.runQuery(`INSERT INTO product_master(_category_id, product_name, product_description, product_price, created_at, updated_at) VALUES(${data._category_id}, '${data.product_name}', '${data.product_description}', ${data.product_price}, '${data.date_created}', '${data.date_created}')`);
                return {
                    data: {
                        message: "Product added successfully."
                    }
                };
            }
            catch (error) {
                console.log(error);
                return {
                    data: {
                        message: error
                    }
                };
            }
        });
    }
    UpdateProduct(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                data.updated_at = moment_1.default.utc().format(dateFormat);
                const fieldsName = Object.keys(data)
                    .map(function (key, index) {
                    var value = typeof data[key] === "string" ? `E'${data[key]}'` : `${data[key]}`;
                    return `${key} = ${value}`;
                })
                    .join(",");
                yield DBManager.runQuery(`UPDATE product_master SET ${fieldsName} WHERE product_id = ${id} `);
                return {
                    data: {
                        message: "Product updated successfully."
                    }
                };
            }
            catch (error) {
                console.log(error);
                return {
                    data: {
                        message: error
                    }
                };
            }
        });
    }
    DeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DBManager.runQuery(`UPDATE product_master SET is_delete = 1, updated_at = '${moment_1.default.utc().format(dateFormat)}' WHERE product_id = ${id} `);
                return {
                    data: {
                        message: "Product deleted successfully."
                    }
                };
            }
            catch (error) {
                console.log(error);
                return {
                    data: {
                        message: error
                    }
                };
            }
        });
    }
}
exports.default = ProductController;
