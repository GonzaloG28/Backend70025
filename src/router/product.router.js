import { Router } from "express"
import { checkProductData } from "../middleware/checkProductData.middleware.js"
import productController from "../controller/product.controller.js"


const router = Router()

//Al hacer la solicitud GET trae todos los productos
router.get("/products", productController.getAllProducts)

//Al hacer la solicitud GET nos trae el producto por su id
router.get("/products/:pid", productController.getProductById);

//Al hacer la solicitud PUT actualiza el producto
router.put("/products/:pid", productController.updateProduct)


//Al hacer la solicitud POST añade un nuevo producto con los datos del body
router.post("/products", checkProductData, productController.createProduct)

//Al hacer la solicitud DELETE elimina el producto
router.delete("/products/:pid", productController.deleteProduct)


export default router