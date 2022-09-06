import router from "express";
import productService from "../service/product.service.js";

const productRouter = router.Router();

productRouter.get("/products", (req, res) => {
  productService.findAll(req, res);
});

productRouter.get("/products/:num", (req, res) => {
  productService.findOne(req, res);
});

productRouter.post("/products", (req, res) => {
  productService.create(req, res);
});

productRouter.put("/products/:num", (req, res) => {
  productService.update(req, res);
});

productRouter.delete("/products/:num", (req, res) => {
  productService.delete(req, res);
});

export default productRouter;
