import router from "express";
import productService from "../service/product.service.js";

const productRouter = router.Router();

productRouter.get("/products", (req: any, res: any) => {
  productService.findAll(req, res);
});

productRouter.get("/products/:num", (req: any, res: any) => {
  productService.findOne(req, res);
});

productRouter.post("/products", (req: any, res: any) => {
  productService.create(req, res);
});

productRouter.put("/products/:num", (req: any, res: any) => {
  productService.update(req, res);
});

productRouter.delete("/products/:num", (req: any, res: any) => {
  productService.delete(req, res);
});

export default productRouter;
