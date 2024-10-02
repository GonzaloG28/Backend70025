import productDao from "../dao/product.dao.js"

class ProductService{
    async getAllProducts(query, options){
        return await productDao.getAll(query, options)
    }

    async getProductById(pid){
        const product = await productDao.getById(pid)
        if(!product) throw new Error("producto no encontrado")
        return product
    }

    async createProduct(data){
        if(!data){
            throw new Error("Datos incompletos para crear el producto")
        }
        const product = await productDao.create(data)
        return product
    }

    async updateProduct(pid, data){
        const update =  await productDao.update(pid, data)
        if(!update) throw new Error("producto no encontrado")
        return update
    }

    async deleteProduct(pid){
        const deleteProduct =  await productDao.deleteOne(pid)
        if(!deleteProduct) throw new Error("producto no encontrado")
        return deleteProduct
    }

}


export default new ProductService()