import express from "express"
import productRouter from "./router/product.router.js"
import cartRouter from "./router/cart.router.js"
import sessionsRouter from "./router/sessions.router.js"
import viewsRouter from "./router/views.router.js"
import { connectMongoDB } from "./config/mongoDB.config.js"
import __dirname from "./util.js"
import { auth } from "./middleware/auth.js"
import handlebars from "express-handlebars"
import envs from "./config/envs.config.js"
import { initPassport } from "./config/passport.config.js"
import passport from "passport"
import cookieParser from "cookie-parser"


const app = express()

connectMongoDB()
 
app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))
//archivos publicos
app.use(express.static("public"))

//configuramos cookies
app.use(cookieParser(envs.SECRET))

//inicializamos passport
initPassport()
app.use(passport.initialize())


// Configuración de Handlebars con opciones para permitir el acceso a propiedades heredadas
app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
})) 
// inicia el motor de la plantilla
app.set("views", __dirname + "/views") // Indicamos que ruta se encuentran las vistas
app.set("view engine", "handlebars") // indicamos con que motor vamos a actualizar las vistas

app.use(auth)

//rutas
app.use("/api", productRouter) 
app.use("/api", cartRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)


app.listen(envs.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
})

