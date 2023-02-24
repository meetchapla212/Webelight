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
const utils_1 = require("../utils");
const dbmanager_1 = __importDefault(require("../common/dbmanager"));
const DBManager = new dbmanager_1.default();
// @Route("auth")
class AuthController {
    //   @Post("/")
    getAccessToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var passcode = data.body.password;
            console.log("getaccesstoken");
            var resultUser = yield DBManager.runQuery(`SELECT * FROM app_users_master where email_id = '${data.body.email_id}' AND is_admin = '${Number(data.body.isAdmin)}'`);
            var rowUser = resultUser.rows || [];
            console.log("rowuser", rowUser);
            if (rowUser.length > 0) {
                var userInfo = rowUser[0];
                const userPasscode = (0, utils_1.createHex)(passcode);
                console.log(userPasscode);
                if (userInfo.password == userPasscode) {
                    return {
                        data: {
                            token: data.body.isAdmin ? (0, utils_1.createAdminJwt)({ user: data.body.email_id }) : (0, utils_1.createUserJwt)({ user: data.body.email_id })
                        }
                    };
                }
                else {
                    return { data: { message: "Password not matched." } };
                }
            }
            else {
                return { data: { message: "User not found." } };
            }
        });
    }
}
exports.default = AuthController;
