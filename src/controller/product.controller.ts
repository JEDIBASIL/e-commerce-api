import { NextFunction, Request, Response } from "express";
import ProductService from "../service/product.service";
import { AddProductDto, GetProductDto, UpdateProductDto } from "../dto/product.dto";
import HttpException from "../exceptions/HttpException";
import HttpResponse from "../response/HttpResponse";

class ProductController {
    private service = new ProductService()
    add = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newProduct: AddProductDto = req.body
            if (!newProduct) throw new HttpException(400, "send the required fields")
            const addedProduct = await this.service.addProduct(newProduct);
            if (!addedProduct) throw new HttpException(500, "an error occurred")
            return res.status(200).send(new HttpResponse("success", "product added", addedProduct))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        const products = await this.service.getAllProducts()
        return res.status(200).send(new HttpResponse("success", "fetched products", products))
    }

    getProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const product = await this.service.getProduct({ id } as GetProductDto);
            return res.status(200).send(new HttpResponse("success", "fetched product", product))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: UpdateProductDto = req.body
            const id: string = req.params.id
            if (!data) throw new HttpException(400, "fill the required fields");
            const updatedProduct: boolean = await this.service.updateProduct(data, id);
            if (!updatedProduct) throw new HttpException(500, "an error occurred");
            return res.status(200).send(new HttpResponse("success", "product updated"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id
        if (!id) throw new HttpException(400, "product id required");
        const deletedProduct: boolean = await this.service.deleteProduct({ id })
        if (!deletedProduct) throw new HttpException(500, "an error occurred");
        return res.status(200).send(new HttpResponse("success", "product deleted"));
    }
}

export default ProductController