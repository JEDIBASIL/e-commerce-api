import { AddProductDto, DeleteProductDto, GetProductDto, UpdateProductDto, CreateCategoryDto } from "../../dto/product.dto";
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

interface IProductService {
    addProduct(newProduct: AddProductDto): Promise<IProduct>;
    getAllProducts(): Promise<IProduct[]>;
    getProduct(id: GetProductDto): Promise<IProduct>;
    deleteProduct(id: DeleteProductDto): Promise<Boolean>;
    updateProduct(product: UpdateProductDto, id: string): Promise<Boolean>;
    addCategory(category: CreateCategoryDto): Promise<ICategory>;
    getCategories(): Promise<ICategory[]>;
    getProductByCategory(categoryName: string): Promise<IProduct[]>
}

export default IProductService