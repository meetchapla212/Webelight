import { Pool, Client } from "pg";
import config from "../config";

export default class DBManager {
    // This function is to run sql query.
    public async runQuery(sqlQry: any): Promise<any> {
        var connection = new Client({
            host: config.DB_HOST,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            port: config.DB_PORT
        });
        connection.connect();

        return new Promise<any>((resolve, reject) => {
            connection.query(sqlQry, function (err: any, res: any) {
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
                } else {
                    resolve(res);
                }
            });
        });
    }
};
