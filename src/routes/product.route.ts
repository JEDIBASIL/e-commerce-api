import { Router } from "express";
import { IRoute } from "../interface";
import ProductController from "../controller/product.controller";
import UserAuth from "../auth/user.auth";
import dtoValidationMiddleware from "../middleware/dto.validation.middleware";
import { AddProductDto } from "../dto/product.dto";
import ErrorMessage from "../enums/error.message.enum";
import AdminAuth from "../auth/admin.auth";

class ProductRoute implements IRoute {
    public path: string = "/product"
    public route: Router = Router()
    private controller = new ProductController()
    constructor() {
        this.initializeRoute()
    }

    private initializeRoute() {
        this.route.post(
            `${this.path}`,
            dtoValidationMiddleware(AddProductDto, "body", ErrorMessage.FIELDS),
            this.controller.addProduct
        )
        this.route.post(
            `${this.path}/category`,
            this.controller.addCategory
        )
        this.route.post(
            `${this.path}/cart`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.addToCart
        )
        this.route.post(
            `${this.path}/cart/increase`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.increaseCartProduct
        )
        this.route.post(
            `${this.path}/cart/decrease`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.decreaseCartProduct
        )
        this.route.get(
            `${this.path}/cart`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.getCartProducts
        );
        this.route.delete(
            `${this.path}/cart`,
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.removeCartProduct
        )
        this.route.get(
            `${this.path}/category`,
            AdminAuth.check,
            AdminAuth.createInstance,
            this.controller.getCategories
        )
        this.route.get(
            `${this.path}/category/:name`,
            this.controller.getProductByCategory
        )
        this.route.get(
            `${this.path}/:id`,
            this.controller.getProduct
        )
        this.route.get(
            `${this.path}`,
            this.controller.getProducts
        )
        this.route.patch(
            `${this.path}/:id`,
            AdminAuth.check,
            AdminAuth.createInstance,
            this.controller.updateProduct
        )
        this.route.delete(
            `${this.path}/:id`,
            AdminAuth.check,
            AdminAuth.createInstance,
            this.controller.deleteProduct
        )
    }
}

export default ProductRoute