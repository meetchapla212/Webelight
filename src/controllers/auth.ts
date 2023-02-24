import { access } from "fs";
import { Post, Route } from "tsoa";
import { createUserJwt, createAdminJwt, createHex } from "../utils";
import DB from "../common/dbmanager";
const DBManager = new DB();

interface AuthResponse {
    data: {
        token: string
    }
}


// @Route("auth")
export default class AuthController {
    //   @Post("/")
    public async getAccessToken(data: any): Promise<any> {
        var passcode = data.body.password;
        console.log("getaccesstoken");
        var resultUser = await DBManager.runQuery(`SELECT * FROM app_users_master where email_id = '${data.body.email_id}' AND is_admin = '${Number(data.body.isAdmin)}'`);
        var rowUser = resultUser.rows || [];
        console.log("rowuser", rowUser);
        if (rowUser.length > 0) {
            var userInfo = rowUser[0];
            const userPasscode = createHex(passcode);
            console.log(userPasscode);
            if (userInfo.password == userPasscode) {
                return {
                    data: {
                        token: data.body.isAdmin ? createAdminJwt({ user: data.body.email_id }) : createUserJwt({ user: data.body.email_id })
                    }
                };
            } else {
                return { data: { message: "Password not matched." } }
            }
        } else {
            return { data: { message: "User not found." } }
        }
    }

}

