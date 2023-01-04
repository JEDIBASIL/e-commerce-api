class AddProductDto {
    name!: string;
    image!: string;
    description!: string;
    qty!: number;
    category!: string;
    price!: number;
}

class DeleteProductDto {
    id!: string;
}



class GetProductDto {
    id!: string;
}

class UpdateProductDto {
    name!: string;
    image!: string;
    description!: string;
    qty!: number;
    category!: string;
    price!: number;
}

class CreateCategoryDto {
    name!: string;
}


export { AddProductDto, DeleteProductDto, GetProductDto, UpdateProductDto, CreateCategoryDto }