import { Get, Route } from "tsoa";
import moment from "moment";
import DB from "../common/dbmanager";
const DBManager = new DB();
const dateFormat = "YYYY-MM-DD HH:mm:ss";

// @Route("ping")
export default class ProductController {
  // @Get("/")
  public async getAllProducts(): Promise<any> {
    try {
      var resultUser = await DBManager.runQuery(`SELECT * FROM product_master INNER JOIN category_master on product_master._category_id = category_master.category_id`);
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

  public async AddProduct(data: any): Promise<any> {
    try {
      data.date_created = moment.utc().format(dateFormat);
      await DBManager.runQuery(`INSERT INTO product_master(_category_id, product_name, product_description, product_price, created_at, updated_at) VALUES(${data._category_id}, '${data.product_name}', '${data.product_description}', ${data.product_price}, '${data.date_created}', '${data.date_created}')`);
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

  public async UpdateProduct(data: any, id: any): Promise<any> {
    try {
      data.updated_at = moment.utc().format(dateFormat);
      const fieldsName = Object.keys(data)
        .map(function (key, index) {
          var value = typeof data[key] === "string" ? `E'${data[key]}'` : `${data[key]}`;
          return `${key} = ${value}`;
        })
        .join(",");
      await DBManager.runQuery(`UPDATE product_master SET ${fieldsName} WHERE product_id = ${id} `);
      return {
        data: {
          message: "Product updated successfully."
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

  public async DeleteProduct(id: any): Promise<any> {
    try {
      await DBManager.runQuery(`UPDATE product_master SET is_delete = 1, updated_at = '${moment.utc().format(dateFormat)}' WHERE product_id = ${id} `);
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

