import { Router } from "express"
import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"
import { auth } from "../middleware/auth.js"
import passport from "passport"

const router = Router()


router.post("/registro", passport.authenticate("registro", {failureRedirect:"/api/sessions/error", session: false}), (req, res) =>{

    if (!req.user) {
        return res.status(400).json({ error: "Registro fallido" });
    }

    let nuevoUsuario = req.user;
    const token = jwt.sign({ id: req.user._id }, envs.SECRET, { expiresIn: '1h' })

    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ nuevoUsuario, token })
})



router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/error", session: false}), (req, res)=>{

    const token = jwt.sign({ id: req.user._id }, envs.SECRET, { expiresIn: '1h' }) 
    res.cookie(envs.SECRET, token, {maxAge:3600000, httpOnly: true})
    res.status(200).json({ payload: "Login exitoso", usuarioLogueado: req.user, token })
})


router.get('/github', passport.authenticate("github", {scope: ["user:email"]}),(req,res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:"/api/sessions/error", session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, envs.SECRET, { expiresIn: '1h' });
    res.cookie(envs.SECRET, token, { httpOnly: true });
    res.redirect('/')
})


router.get("/logout", auth, (req, res)=>{
    let cookies=Object.keys(req.cookies)
    cookies.forEach(cookie=>{
        res.clearCookie(cookie)
    })

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(cookie=>{
        res.clearCookie(cookie)
    })
    res.status(200).json({ payload: "Logout exitoso"})
})



router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar con passport`})
})



export default router