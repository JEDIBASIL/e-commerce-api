import { ObjectId } from "mongoose";
import { AddProductDto, GetProductDto, DeleteProductDto, UpdateProductDto, CreateCategoryDto } from "../dto/product.dto";
import HttpException from "../exceptions/HttpException";
import { ICategory, IProduct, IProductService } from "../interface";
import categoryModel from "../models/category.model";
import productModel from "../models/product.model";

class ProductService implements IProductService {

    private model = productModel
    private categoryM = categoryModel
    async addCategory(newCategory: CreateCategoryDto): Promise<ICategory> {
        const category = await this.categoryM.create({ ...newCategory })
        return category
    }
    async getCategories(): Promise<ICategory[]> {
        const category = await this.categoryM.find()
        return category
    }
    async addProduct(newProduct: AddProductDto): Promise<IProduct> {
        const addedProduct = await this.model.create({ ...newProduct })
        const categoryExist = await this.isCategory(newProduct.category, "id")
        if (!categoryExist) throw new HttpException(404, "category not found")
        return addedProduct
    };
    async getAllProducts(): Promise<IProduct[]> {
        return await this.model.find().populate(["category"])
    }
    async getProduct(productId: GetProductDto): Promise<IProduct> {
        const { id } = productId
        const product = await this.model.findById(id).populate(["category"])
        if (!product) throw new HttpException(404, "product not found")
        return product;
    }
    async getProductByCategory(categoryName: string): Promise<IProduct[]> {
        const categoryExist = await this.isCategory(categoryName, "name")
        if (!categoryExist) throw new HttpException(404, "category not found")
        const productsByCategory = (await this.model.find().populate(["category"])).filter(product => product.category.name === categoryName)
        return productsByCategory;
    }
    async deleteProduct(productId: DeleteProductDto): Promise<boolean> {
        const { id } = productId
        const deletedProduct = await this.model.findByIdAndDelete(id)
        if (!deletedProduct) throw new HttpException(404, "product not found")
        return true;
    }
    async updateProduct(product: UpdateProductDto, productId: string): Promise<boolean> {

        const updatedProduct = await this.model.findById(productId)
        if (!updatedProduct) throw new HttpException(404, "product not found")
        const categoryExist = await this.isCategory(product.category, "id")
        if (!categoryExist) throw new HttpException(404, "category not found")
        updatedProduct.image = product.image;
        updatedProduct.qty = product.qty;
        updatedProduct.description = product.description;
        updatedProduct.name = product.name;
        updatedProduct.category = product.category as unknown as ObjectId;
        await updatedProduct.save()
        return true;
    }
    private async isCategory(filter: string, field: string): Promise<boolean> {
        if (field === "id") {
            const isExist = await this.categoryM.findById(filter);
            return isExist ? true : false
        }
        const isExist = await this.categoryM.findOne({ name: filter });
        return isExist ? true : false
    }
}

export default ProductService