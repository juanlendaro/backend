class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(product)
        console.log(this.products)
    }
    #getMaxId() {
        let maxId = 0
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id
        })
        return maxId
    }

    getProductById
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este  es un producto prueba", 200, "Sin imagen", "abc123", 25)