import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import Router from "./routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.use(Router);
