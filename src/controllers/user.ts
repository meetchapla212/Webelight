import { Get, Route } from "tsoa";
import moment from "moment";
import DB from "../common/dbmanager";
const DBManager = new DB();
const dateFormat = "YYYY-MM-DD HH:mm:ss";

// @Route("ping")
export default class ProductController {
    // @Get("/")
    public async getCart(user_id: any): Promise<any> {
        try {
            var resultUser = await DBManager.runQuery(`SELECT * FROM users_cart_master INNER JOIN 
      product_master on users_cart_master._product_id = product_master.product_id 
      INNER JOIN category_master on users_cart_master._category_id = category_master.category_id WHERE _user_id = ${user_id}`);
            var rowUser = resultUser.rows || [];
            console.log("rowuser", rowUser);
            if (rowUser.length > 0) {
                return rowUser;
            }
            else {
                return {
                    message: "Product not found."
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async addProduct(data: any): Promise<any> {
        try {
            data.date_created = moment.utc().format(dateFormat);
            await DBManager.runQuery(`INSERT INTO users_cart_master(_product_id, _category_id, _user_id, created_at, updated_at) VALUES(${data._product_id}, '${data._category_id}', '${data._user_id}', '${data.date_created}', '${data.date_created}')`);
            return {
                data: {
                    message: "Product added successfully."
                }
            }
        } catch (error) {
            console.log(error);
            return {
                data: {
                    message: error
                }
            }
        }
    }

    public async deleteProduct(id: any): Promise<any> {
        try {
            await DBManager.runQuery(`UPDATE users_cart_master SET is_delete = 1, updated_at = '${moment.utc().format(dateFormat)}' WHERE users_product_id = ${id} `);
            return {
                data: {
                    message: "Product deleted successfully."
                }
            }
        } catch (error) {
            console.log(error);
            return {
                data: {
                    message: error
                }
            }
        }
    }
}

