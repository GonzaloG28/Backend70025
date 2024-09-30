import cartDao from "../dao/cart.dao.js"

//logica del negocio
class CartService{
    async createCart() {
        return await cartDao.create()
    }

    async getCartById(cid) {
        return await cartDao.getById(cid)
    }

    async addProductToCart(cid, pid) {
        return await cartDao.addProductToCart(cid, pid)
    }

    async deleteProductInCart(cid, pid) {
        return await cartDao.deleteProductInCart(cid, pid)
    }

    async updateQuantityProductInCart(cid, pid, quantity) {
        return await cartDao.updateQuantityProductInCart(cid, pid, quantity)
    }

    async deleteAllProductInCart(cid) {
        return await cartDao.deleteAllProductsInCart(cid)
    }
}

export default new CartService()