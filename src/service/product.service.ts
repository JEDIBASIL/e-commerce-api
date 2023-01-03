import { AddProduct, GetProduct, DeleteProduct, UpdateProduct } from "../dto/product.dto";
import HttpException from "../exceptions/HttpException";
import { IProduct, IProductService } from "../interface";
import productModel from "../models/product.model";

class ProductService implements IProductService {
    private model = productModel
    async addProduct(newProduct: AddProduct): Promise<IProduct> {
        const addedProduct = await this.model.create({ ...newProduct })
        return addedProduct
    };
    async getAllProducts(): Promise<IProduct[]> {
        return await this.model.find()
    }
    async getProduct(productId: GetProduct): Promise<AddProduct> {
        const { id } = productId
        const product = await this.model.findOne({ _id: id })
        if (!product) throw new HttpException(404, "product not found")
        return product;
    }

    async deleteProduct(productId: DeleteProduct): Promise<Boolean> {
        const { id } = productId
        const deletedProduct = await this.model.findByIdAndDelete(id)
        if (!deletedProduct) throw new HttpException(404, "product not found")
        return true;
    }
    async updateProduct(product: UpdateProduct): Promise<Boolean> {
        const { id } = product
        const updatedProduct = await this.model.findById(id)
        if (!updatedProduct) throw new HttpException(404, "product not found")
        updatedProduct.image = product.image;
        updatedProduct.qty = product.qty;
        updatedProduct.description = product.description;
        updatedProduct.name = product.name;
        updatedProduct.category = product.category;
        await updatedProduct.save()
        return true;
    }

}