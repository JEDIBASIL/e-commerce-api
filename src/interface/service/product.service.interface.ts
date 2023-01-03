import { AddProductDto, DeleteProductDto, GetProductDto, UpdateProductDto } from "../../dto/product.dto";
import IProduct from "../model/products.model.interface";


// get all products
// get each product
// delete product
// update product
// add product

interface IProductService {
    addProduct(newProduct: AddProductDto): Promise<IProduct>;
    getAllProducts(): Promise<IProduct[]>;
    getProduct(id: GetProductDto): Promise<AddProductDto>;
    deleteProduct(id: DeleteProductDto): Promise<Boolean>;
    updateProduct(product: UpdateProductDto,id:string): Promise<Boolean>;
}

export default IProductService