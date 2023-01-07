import { AddProductDto, DeleteProductDto, GetProductDto, UpdateProductDto, CreateCategoryDto, CartDto, GetCartProductDto } from "../../dto/product.dto";
import ICart from "../model/cart.model.interface";
import ICategory from "../model/category.model.interface";
import IProduct from "../model/products.model.interface";


// get all products
// get each product
// delete product
// update product
// add product
// add category
// get categories
// get product by category
// get all products in cart
// add to cart
// increase  cart item qty
// decrease  cart item qty

interface IProductService {
    addProduct(newProduct: AddProductDto): Promise<IProduct>;
    getAllProducts(): Promise<IProduct[]>;
    getProduct(id: GetProductDto): Promise<IProduct>;
    deleteProduct(id: DeleteProductDto): Promise<Boolean>;
    updateProduct(product: UpdateProductDto, id: string): Promise<Boolean>;
    addCategory(category: CreateCategoryDto): Promise<ICategory>;
    getCategories(): Promise<ICategory[]>;
    getProductByCategory(categoryName: string): Promise<IProduct[]>
    addToCart(id:CartDto): Promise<ICart>
    getCartProducts(account:GetCartProductDto):Promise<ICart[]>
}

export default IProductService