import { Router } from "express"
import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"
import passport from "passport"

const router = Router()


router.post("/log", passport.authenticate("log", {failureRedirect:"/api/sessions/error"}), (req, res) =>{

    if (!req.user) {
        return res.status(400).json({ error: "Registro fallido" });
    }

    let nuevoUsuario = req.user;
    let token = jwt.sign(nuevoUsuario, envs.SECRET, { expiresIn: "1h" })

    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ nuevoUsuario, token })
    console.log("datos enviados")
})



router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/error"}), (req, res)=>{

    req.session.usuario=req.user

    const token = jwt.sign({ id: req.user._id }, envs.SECRET, { expiresIn: '1h' }); // Ajusta la clave secreta y el tiempo de expiración
    res.cookie(envs.SECRET, token, {maxAge:3600000})

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ payload: "Login exitoso", usuarioLogueado: req.user, token })
    console.log("logueado", token)
})




router.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar con passport`})
})



export default router