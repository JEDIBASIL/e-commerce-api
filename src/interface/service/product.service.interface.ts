import { AddProduct, DeleteProduct, GetProduct, UpdateProduct } from "../../dto/product.dto";


// get all products
// get each product
// delete product
// update product
// add product

interface IProductService{
    addProduct:(newProduct:AddProduct) => Promise<AddProduct>;
    getAllProducts:() => Promise<AddProduct[]>;
    getProduct:(id:GetProduct) => Promise<AddProduct>;
    deleteProduct:(id:DeleteProduct) => Promise<Boolean>;
    updateProduct:(product:UpdateProduct) => Promise<Boolean>;
}