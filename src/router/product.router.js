import { Router } from "express"
import { checkProductData } from "../middleware/checkProductData.middleware.js"
import productDao from "../dao/product.dao.js"


const router = Router()

//Al hacer la solicitud GET trae todos los productos
router.get("/products", async (req, res) =>{

  try {
    const {limit, page, sort, category, status} = req.query

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
          price: sort === "asc" ? 1 : -1
      }
    }


    if(status){
      const products = await productDao.getAll({status}, options)
      console.log(products)
      return res.status(200).json({ status: "ok", products})
    }


    if(category){
      const products = await productDao.getAll({category}, options)
      return res.status(200).json({status: "ok", products})
    }


    const products = await productDao.getAll({}, options)
    res.status(200).json({ status: "ok", products})

  } catch (err) {
      console.log(err)
      res.status(500).send("Error al obtener los productos")
  }
})

//Al hacer la solicitud GET nos trae el producto por su id
router.get("/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productDao.getById(pid)
      if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" })
  
      res.status(200).json({ status: "ok", product })
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  });



//Al hacer la solicitud PUT actualiza el producto
router.put("/products/:pid", async (req, res) =>{
    const { pid } = req.params
    const body = req.body

    const product = await productDao.update(pid, body)

    res.status(200).json({ status: "ok", product})
})


//Al hacer la solicitud POST añade un nuevo producto con los datos del body
router.post("/products", checkProductData, async(req, res) =>{
    try{
        const body = req.body
        const product = await productDao.create(body)

        res.status(201).json({ status:"ok", product})
    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})

//Al hacer la solicitud DELETE elimina el producto
router.delete("/products/:pid", async(req, res) =>{
    try{
        const { pid } = req.params
        const product = await productDao.deleteOne(pid)

        if(!product) return res.status(404).json({ status:"error", msg:"Producto no encontrado"})

        res.status(200).json({ status:"ok", msg:`Producto con el ID ${pid} eliminado con exito` })

    }catch(err){
        console.log(err)
        res.status(500).json({ status:"error", msg:"Error interno del servidor"})
    }
})


export default router