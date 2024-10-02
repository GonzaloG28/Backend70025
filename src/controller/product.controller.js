import productService from "../services/product.service.js"

class ProductController{
    async getAllProducts(req, res){
        try{
            const {limit, page, sort, category, status} = req.query

            const options = {
                limit: limit || 10,
                page: page || 1,
                sort: {
                    price: sort === "asc" ? 1 : -1
                }
    }


    if(status){
      const products = await productService.getAllProducts({status}, options)
      console.log(products)
      return res.status(200).json({ status: "ok", products})
    }


    if(category){
      const products = await productService.getAllProducts({category}, options)
      return res.status(200).json({status: "ok", products})
    }


    const products = await productService.getAllProducts({}, options)

    res.status(200).json({ status: "ok", products})
        }catch(err){
            res.status(500).json({status: "error", msg: "Error al obtener los productos"})
        }
    }

    async getProductById(req, res){
        try {
            const { pid } = req.params
            const product = await productService.getProductById(pid)
            if (!product) {
                return res.status(404).json({ status: "error", msg: "Producto no encontrado" })
            }
            res.status(200).json({ status: "ok", product })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", msg: "Error interno del servidor" })
        }
    }

    async createProduct(req, res){
        try {
            const productData = req.body
            const product = await productService.createProduct(productData)
            res.status(201).json({ status: "ok", product })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", msg: "Error interno del servidor" })
        }
    }

    async updateProduct(req, res){
        try {
            const { pid } = req.params
            const productData = req.body
            const product = await productService.updateProduct(pid, productData)
            res.status(200).json({ status: "ok", product })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", msg: "Error interno del servidor" })
        }
    }

    async deleteProduct(req, res){
        try {
            const { pid } = req.params
            const product = await productService.deleteProduct(pid)
            if (!product) {
                return res.status(404).json({ status: "error", msg: "Producto no encontrado" })
            }
            res.status(200).json({ status: "ok", msg: `Producto con el ID ${pid} eliminado con éxito` })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", msg: "Error interno del servidor" })
        }
    }
}

export default new ProductController()