import { Router } from "express"
import { auth } from "../middleware/auth.js"
import { UsuariosDao } from "../dao/users.dao.js"
import productDao from "../dao/product.dao.js"

const router = Router()


router.get('/', (req,res)=>{
    console.log('req.user:', req.user)
    res.status(200).render('home', {
        titulo: "Home Page prueba Login...!!!",
        //isLogin = false
        isLogin: req.user
    })
})

router.get('/registro', (req,res)=>{

        res.status(200).render('registro', {
            isLogin: req.user
        })
    })

router.get('/current', auth, async (req, res) => {
        try {
            //busca el usuario en la base de datos usando el id almacenado en req.user
            const user = await UsuariosDao.getBy({ _id: req.user.id })
            console.log("req.user",req.user)
            if (!user) {
                return res.status(404).send('Usuario no encontrado')
            }
    
            // Recupera los productos desde la base de datos
            const result = await productDao.getAll()
            const products = result.docs
            
            
            res.status(200).render('perfil', {
                usuario: user,
                isLogin: req.user,
                products
            })
    
        } catch (err) {
            console.log(err)
            res.status(500).send("Error al obtener los productos")
        }
    })
    

router.get('/login', (req,res)=>{

    res.status(200).render('login', {
        isLogin: req.user
    })
})


export default router