import passport from "passport"
import local from "passport-local"
import { generarHash, validaPass } from "../util.js"
import { UsuariosDao } from "../dao/users.dao.js"
import { userModel } from "../dao/models/user.model.js"

const usuariosDao = new UsuariosDao()

//configuracion de passport para el registro de usuario
export const initPassport=() =>{
    passport.use(
        "log",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async(req, username, password, done) =>{
                try{
                    let { first_name } = req.body
                    if(!first_name){
                        return done(null, false)
                    }

                    let exist = await usuariosDao.getBy({email: username})
                    if(exist){
                        return done(null, false)
                    }

                    let newUser = await usuariosDao.create({first_name, email: username, password: generarHash(password)})
                    return done(null, newUser)

                }catch(err){
                    return done(err)
                }
            }
        )
    )

    //login local
    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField:"email"
            },
            async(username, password, done)=>{
                try{
                    let user = await userModel.getBy({email:username})
                    if(!user){
                        console.log("invalid user")
                        return done(null, false)
                    }

                    if(!validaPass(password, user.password)){
                        console.log("invalid password")
                        return done(null, false)
                    }

                    delete user.password
                    return done(null, user)
                }catch(err){
                    return done(err)
                }
            }
        )
    )



    //solo si usamos sessions
    passport.serializeUser(function(user, done){
        return done(null, user._id)
    })

    passport.deserializeUser(async function (id, done) {
        let user=await usuariosDao.getBy({_id:id})
        return done(null, user)
    })
}