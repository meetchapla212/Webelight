import express from "express";
import AdminProductController from "../controllers/admin";
import UserProductController from "../controllers/user";
import AuthController from "../controllers/auth";
import { verifyJwt } from "../utils";
const router = express.Router();

router.post("/auth", async (_req, res) => {
  const controller = new AuthController();
  console.log("req.body", _req.body);
  const response = await controller.getAccessToken(_req);
  console.log("response", response);
  return res.send(response);
});

router.get("/admin/allProducts", async (_req, res) => {
  try {
    await verifyJwt(_req, res, true);
    const controller = new AdminProductController();
    const response = await controller.getAllProducts();
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});

router.post("/admin/add/product", async (_req, res) => {
  try {
    await verifyJwt(_req, res, true);
    const controller = new AdminProductController();
    const response = await controller.AddProduct(_req.body);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});

router.put("/admin/update/product", async (_req, res) => {
  try {
    await verifyJwt(_req, res, true);
    const controller = new AdminProductController();
    const id = _req.body.product_id;
    delete _req.body.product_id;
    const response = await controller.UpdateProduct(_req.body, id);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});

router.delete("/admin/delete/product", async (_req, res) => {
  try {
    await verifyJwt(_req, res, true);
    const controller = new AdminProductController();
    const id = _req.body.product_id;
    const response = await controller.DeleteProduct(id);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});

router.post("/user/cart/add/product", async (_req, res) => {
  try {
    await verifyJwt(_req, res, false);
    const controller = new UserProductController();
    const response = await controller.addProduct(_req.body);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});


router.get("/user/get/cart", async (_req, res) => {
  try {
    await verifyJwt(_req, res, false);
    const controller = new UserProductController();
    console.log("_req", _req.query);
    const response = await controller.getCart(_req.query._user_id);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});


router.delete("/user/cart/delete/product", async (_req, res) => {
  try {
    await verifyJwt(_req, res, false);
    const controller = new UserProductController();
    const response = await controller.deleteProduct(_req.body.users_product_id);
    return res.send(response);
  } catch (error: any) {
    console.log(error);
    res.send({ message: error });
  }
});
export default router;
