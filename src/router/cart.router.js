import { Router } from "express"
import cartController from "../controller/cart.controller.js"
import { checkProductAndCart } from "../middleware/checkProductAndCart.middleware.js"


const router = Router()
//entrada y salida de peticiones
router.post("/carts", cartController.createCart)

router.get("/carts/:cid", cartController.getCartById)

router.post("/carts/:cid/product/:pid", checkProductAndCart, cartController.addProductToCart)

router.delete("/carts/:cid/products/:pid", checkProductAndCart, cartController.deleteProductInCart)

router.put("/carts/:cid/product/:pid", checkProductAndCart, cartController.updateQuantityProductInCart)

router.delete("/carts/:cid", cartController.deleteAllProductsInCart)

export default router
