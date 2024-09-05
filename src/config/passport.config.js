import passport from "passport"
import local from "passport-local"
import { generarHash, validaPass } from "../util.js"
import { UsuariosDao } from "../dao/users.dao.js"


//configuracion de passport para el registro de usuario
export const initPassport=() =>{
    passport.use(
        "log",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true,
                session: false
            },
            async(req, username, password, done) =>{
                try{
                    let {first_name, last_name, age} = req.body
                    if(!last_name || !last_name || !age){
                        return done(null, false)
                    }

                    let exist = await UsuariosDao.getBy({email: username})
                    if(exist){
                        return done(null, false)
                    }

                    let newUser = await UsuariosDao.create(
                        {
                            first_name, 
                            last_name, 
                            age, 
                            email: username, 
                            password: generarHash(password)
                        })
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
                usernameField:"email",
                session: false
            },
            async(username, password, done)=>{
                try{
                    let user = await UsuariosDao.getBy({email:username})
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
}