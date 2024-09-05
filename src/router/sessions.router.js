import { Router } from "express"
import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"
import { auth } from "../middleware/auth.js"
import productDao from "../dao/product.dao.js"
import { UsuariosDao } from "../dao/users.dao.js"
import passport from "passport"

const router = Router()


router.post("/log", passport.authenticate("log", {failureRedirect:"/api/sessions/error", session: false}), (req, res) =>{

    if (!req.user) {
        return res.status(400).json({ error: "Registro fallido" });
    }

    let nuevoUsuario = req.user;
    console.log(nuevoUsuario)
    
    let token = jwt.sign(nuevoUsuario, envs.SECRET, { expiresIn: "1h" })

    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ nuevoUsuario, token })
    console.log("datos enviados")
})



router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/error", session: false}), (req, res)=>{

    const token = jwt.sign({ id: req.user._id }, envs.SECRET, { expiresIn: '1h' }) 
    res.cookie(envs.SECRET, token, {maxAge:3600000})
    res.status(200).json({ payload: "Login exitoso", usuarioLogueado: req.user, token })
    console.log("logueado", token)
})

router.get('/current', auth, async (req, res) => {
    try {
        //busca el usuario en la base de datos usando el id almacenado en req.user
        const user = await UsuariosDao.getBy({ _id: req.user.id })

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



router.get("/logout", (req, res)=>{
    res.clearCookie(envs.SECRET)
    res.status(200).json({ payload: "Logout exitoso"})
})



router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar con passport`})
})



export default router