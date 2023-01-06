import { Router } from "express";
import { IRoute } from "../interface";
import ProductController from "../controller/product.controller";
import UserAuth from "../auth/user.auth";

class ProductRoute implements IRoute {
    public path: string = "/product"
    public route: Router = Router()
    private controller = new ProductController()
    constructor() {
        this.initializeRoute()
    }

    private initializeRoute() {
        this.route.post(`${this.path}`, this.controller.addProduct)
        this.route.post(`${this.path}/category`, this.controller.addCategory)
        this.route.post(`${this.path}/cart`, UserAuth.check, UserAuth.createInstance, this.controller.addToCart)
        this.route.get(`${this.path}/category`, this.controller.getCategories)
        this.route.get(`${this.path}/category/:name`, this.controller.getProductByCategory)
        this.route.get(`${this.path}/:id`, this.controller.getProduct)
        this.route.get(`${this.path}`, this.controller.getProducts)
        this.route.patch(`${this.path}/:id`, this.controller.updateProduct)
        this.route.delete(`${this.path}/:id`, this.controller.deleteProduct)
    }
}

export default ProductRoute