import passport from "passport"
import local from "passport-local"
import { generarHash } from "../util.js"
import { UsuariosDao } from "../dao/users.dao.js"

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

    passport.serializeUser(function(user, done){
        return done(null, user._id)
    })

    passport.deserializeUser(async function (id, done) {
        let user=await usuariosDao.getBy({_id:id})
        return done(null, user)
    })
}