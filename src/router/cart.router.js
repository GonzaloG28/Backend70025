import { Router } from "express"
import cartDao from "../dao/cart.dao.js"
import { checkProductAndCart } from "../middleware/checkProductAndCart.middleware.js"


const router = Router()

//Crear carrito
router.post("/carts", async(req, res) =>{
    try{
        const cart = await cartDao.create()
        res.status(201).json({ status:"ok", cart})

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//obtener un carrito
router.get("/carts/:cid", async(req, res) =>{
    try{
        const { cid } = req.params
        const cart = await cartDao.getById(cid)

        if(!cart) return res.status(404).json({ status:"error", msg:"Carrito no encontrado"})

        res.status(200).json({ status:"ok", cart})

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


//agregar producto al carrito
router.post("/carts/:cid/product/:pid", checkProductAndCart, async(req, res) =>{
    try{
        const { cid, pid } = req.params

        const cart = await cartDao.addProductToCart(cid, pid)

        res.status(201).json({ status:"ok", cart})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//eliminar producto carrito
router.delete("/carts/:cid/product/:pid", checkProductAndCart, async (req, res) =>{
    try{
        const { cid, pid } = req.params
        const cart = await cartDao.deleteProductInCart(cid, pid)
        res.status(201).json({ status: "ok", msg:"Producto eliminado", cart })
    }catch(err){
        console.log(err)
        res.status(500).json({ status: "error", msg: "Error interno del servidor"})
    }
})

//actualizar cantidad producto
router.put("/carts/:cid/product/:pid", checkProductAndCart, async (req, res) => {
    try{
        const { cid, pid } = req.params
        const { quantity } = req.body
        
        const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity)
        res.status(201).json({ status: "ok", cart})
    }catch(err){
        console.log(err)
        res.status(500).json({ status: "error", msg: "Error interno del servidor"})
    }
})


//eliminar todos los productos del carrito
router.delete("/carts/:cid", async(req, res) =>{
    try{
        const { cid } = req.params
        const cart = await cartDao.getById(cid)

        if(!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado"})

        const cartResponse = await cartDao.deleteAllProductsInCart(cid)
        res.status(201).json({ status: "ok", cart: cartResponse})

    }catch(err){
        console.log(err)
        res.status(500).json({ status: "error", msg: "Error interno del servidor"})
    }
})

export default router
