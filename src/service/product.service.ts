import { Document, ObjectId } from "mongoose";
import { AddProductDto, GetProductDto, DeleteProductDto, UpdateProductDto, CreateCategoryDto, CartDto, GetCartProductDto } from "../dto/product.dto";
import HttpException from "../exceptions/HttpException";
import { ICart, ICategory, IProduct, IProductService } from "../interface";
import categoryModel from "../models/category.model";
import productModel from "../models/product.model";
import cartModel from "../models/cart.model";
import logger from "../utils/logger";

class ProductService implements IProductService {

    private productM = productModel
    private categoryM = categoryModel
    private cartM = cartModel
    async addCategory(newCategory: CreateCategoryDto): Promise<ICategory> {
        const category = await this.categoryM.create({ ...newCategory })
        return category
    }
    async getCategories(): Promise<ICategory[]> {
        const category = await this.categoryM.find()
        return category
    }
    async addProduct(newProduct: AddProductDto): Promise<IProduct> {
        const addedProduct = await this.productM.create({ ...newProduct })
        const categoryExist = await this.isCategory(newProduct.category, "id")
        if (!categoryExist) throw new HttpException(404, "category not found")
        return addedProduct
    };
    async getAllProducts(): Promise<IProduct[]> {
        return await this.productM.find().populate(["category"])
    }
    async getProduct(productId: GetProductDto): Promise<IProduct> {
        const { id } = productId
        const product = await this.productM.findById(id).populate(["category"])
        if (!product) throw new HttpException(404, "product not found")
        return product;
    }
    async getProductByCategory(categoryName: string): Promise<IProduct[]> {
        const categoryExist = await this.isCategory(categoryName, "name")
        if (!categoryExist) throw new HttpException(404, "category not found")
        const productsByCategory: IProduct[] = (await this.productM.find().populate(["category"])).filter((product: IProduct) => product.category.name === categoryName)
        return productsByCategory;
    }
    async deleteProduct(productId: DeleteProductDto): Promise<boolean> {
        const { id } = productId
        const deletedProduct = await this.productM.findByIdAndDelete(id)
        if (!deletedProduct) throw new HttpException(404, "product not found")
        return true;
    }
    async updateProduct(product: UpdateProductDto, productId: string): Promise<boolean> {

        const updatedProduct = await this.productM.findById(productId)
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
    async addToCart(Item: CartDto): Promise<ICart> {
        const { accountId, productId } = Item
        const isInCart = await this.isInCart(accountId, productId)
        if (isInCart) throw new HttpException(409, "product already in cart")
        const product = await this.productM.findById(productId);
        if (!product) throw new HttpException(404, "product not found")
        const newItem: ICart = await this.cartM.create({ user: accountId, product: productId, qty: 1, price: product?.price })
        return newItem;
    }
    async getCartProducts(account: GetCartProductDto): Promise<ICart[]> {
        const { accountId } = account
        const cartProducts: ICart[] = await this.cartM.find({ user: accountId })
        return cartProducts
    }
    private async isInCart(account: string, product: string): Promise<ICart & Document> {
        const foundProduct = await this.cartM.findOne({ user: account, product });
        return foundProduct as Document & ICart;
    }
    async increaseCartProduct(accountId: string, productId: string): Promise<ICart> {
        const isInCart = await this.isInCart(accountId, productId)
        if (!isInCart) throw new HttpException(409, "product is not in cart")
        const product = await this.productM.findById(productId);
        if (!product) throw new HttpException(404, "product not found")
        if (isInCart.qty === product.qty) throw new HttpException(409, "no enough product")
        const qty = ++isInCart.qty;
        isInCart.qty = qty
        isInCart.price = product?.price * qty
        logger.info(qty)
        isInCart.save()
        return isInCart;
    }
}

export default ProductService