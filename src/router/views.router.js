import { Router } from "express"
import { auth } from "../middleware/auth.js"

const router = Router()


router.get('/', (req,res)=>{
    console.log('req.user:', req.user)
    res.status(200).render('home', {
        titulo: "Home Page prueba Login...!!!",
        //isLogin = false
        isLogin: req.user
    })
    console.log("req.user",req.user)
})

router.get('/registro', (req,res)=>{

        res.status(200).render('registro', {
            isLogin: req.user
        })
        console.log("estas en registro")
        console.log("req.user:", req.user)
    })


router.get('/login', (req,res)=>{

    res.status(200).render('login', {
        isLogin: req.user
    })
    console.log("estan en login")
    console.log("req.user:", req.user)
})


export default router