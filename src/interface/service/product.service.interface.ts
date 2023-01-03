import { AddProduct, DeleteProduct, GetProduct, UpdateProduct } from "../../dto/product.dto";
import IProduct from "../model/products.model.interface";


// get all products
// get each product
// delete product
// update product
// add product

interface IProductService {
    addProduct(newProduct: AddProduct): Promise<IProduct>;
    getAllProducts(): Promise<IProduct[]>;
    getProduct(id: GetProduct): Promise<AddProduct>;
    deleteProduct(id: DeleteProduct): Promise<Boolean>;
    updateProduct(product: UpdateProduct): Promise<Boolean>;
}

export default IProductService