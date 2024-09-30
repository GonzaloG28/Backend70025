import cartService from "../services/cart.service.js"

//logica de las respuestas 
class CartController {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart()
      res.status(201).json({ status: "ok", cart })
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }

  async getCartById(req, res) {
    try {
      const { cid } = req.params
      const cart = await cartService.getCartById(cid)

      if (!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado" })

      res.status(200).json({ status: "ok", cart })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params
      const cart = await cartService.addProductToCart(cid, pid)
      res.status(201).json({ status: "ok", cart })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }

  async deleteProductInCart(req, res) {
    try {
      const { cid, pid } = req.params
      const cart = await cartService.deleteProductInCart(cid, pid)
      res.status(201).json({ status: "ok", msg: "Producto eliminado", cart })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }

  async updateQuantityProductInCart(req, res) {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body

      const cart = await cartService.updateQuantityProductInCart(cid, pid, quantity)
      res.status(201).json({ status: "ok", cart })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }

  async deleteAllProductsInCart(req, res) {
    try {
      const { cid } = req.params
      const cart = await cartService.getCartById(cid)

      if (!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado" })

      const cartResponse = await cartService.deleteAllProductsInCart(cid)
      res.status(201).json({ status: "ok", cart: cartResponse })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }
}

export default new CartController()