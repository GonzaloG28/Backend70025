import { Router } from "express"

const router = Router()


router.get('/', (req,res)=>{

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
        console.log("estas en registro")
    })


router.get('/login', (req,res)=>{

    res.status(200).render('login', {
        isLogin: req.user
    })
    console.log("estan en login")
})


export default router