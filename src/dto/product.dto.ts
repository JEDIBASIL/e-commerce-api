class AddProduct {
    name!: string;
    image!: string;
    description!: string;
}

class DeleteProduct {
    id!: string;
    name!: string;
    image!: string;
    description!: string;
}


class GetProduct {
    id!: string;
}

class UpdateProduct {
    id!: string;
    name!: string;
    image!: string;
    description!: string;
}

export { AddProduct, DeleteProduct, GetProduct, UpdateProduct }