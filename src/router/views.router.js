import { Router } from "express"
import productDao from "../dao/product.dao.js"

const router = Router()

router.get("/products", async (req, res) => {
    try {
        const result = await productDao.getAll(); // Ajusta la llamada si es necesario
        const products = result.docs; // `docs` contiene los productos cuando usas paginate()
        console.log(products); // Verifica la estructura de los productos
        res.render('home', { products });
    } catch (err) {
        console.log(err)
        res.status(500).send("Error al obtener los productos")
    }
})

export default router