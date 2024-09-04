import { Router } from "express"
import productDao from "../dao/product.dao.js"
import { auth } from "../middleware/auth.js"

const router = Router()


router.get('/',(req,res)=>{

    res.status(200).render('home', {
        titulo: "Home Page prueba Login...!!!",
        isLogin: req.user // Usamos req.user que viene del middleware auth
    })
})

router.get('/current', auth, async (req, res) => {
    try {
        const result = await productDao.getAll()// Recupera los productos desde la base de datos
        const products = result.docs // Asegúrate de ajustar esto según la estructura de `result`

        // Renderiza la vista 'perfil', pasando la información del usuario y los productos
        res.status(200).render('perfil', {
            usuario: req.user, // Información del usuario autenticado
            isLogin: req.user, // Indica que el usuario está logueado
            products // Lista de productos para mostrar en la página de perfil
        });
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).send('Error interno del servidor')
    }
})

router.get('/registro', (req,res)=>{

        res.status(200).render('registro', {
            isLogin: false // No hay usuario logueado
        })
        console.log("estas en registro")
    })

router.get('/login', (req,res)=>{

    res.status(200).render('login', {
        isLogin: false // No hay usuario logueado
    })
    console.log("estas en login")
})

export default router