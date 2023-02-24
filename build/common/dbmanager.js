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
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
class DBManager {
    // This function is to run sql query.
    runQuery(sqlQry) {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = new pg_1.Client({
                host: config_1.default.DB_HOST,
                user: config_1.default.DB_USERNAME,
                password: config_1.default.DB_PASSWORD,
                database: config_1.default.DB_NAME,
                port: config_1.default.DB_PORT
            });
            connection.connect();
            return new Promise((resolve, reject) => {
                connection.query(sqlQry, function (err, res) {
                    connection.end();
                    if (err) {
                        console.error("sqlQry> ", sqlQry);
                        console.error("Error", err);
                        var errorObj = {
                            message: `Critical Error! Please try again later`,
                            code: 500,
                        };
                        reject(errorObj);
                        return;
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
}
exports.default = DBManager;
;
