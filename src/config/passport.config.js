import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { generarHash, validaPass } from "../util.js"
import { UsuariosDao } from "../dao/users.dao.js"



//configuracion de passport para el registro de usuario
export const initPassport=() =>{
    passport.use(
        "registro",
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

//login github
passport.use(
    "github",
    new github.Strategy(
        {
            clientID: "Iv23liqbE5FJi6DjDyWR",
            clientSecret: "20d456ce7ad0b62ce0d9b356fb16e3a09f9d0016",
            callBackURL:"http://localhost:3000/api/sessions/githubcallback"
        },
        async( accessToken, refreshToken, profile, done)=>{
            try{
            			
            let user= await UsuariosDao.getBy({email: profile._json.email})
            if(!user){
                let newUser={
                    first_name: profile._json.name,
                    last_name: "",
                    age:"", 
                    email: profile._json.email,
                    password: ""
                    }
                    let result = await UsuariosDao.create(newUser)
                    done(null, result)
            }else{
                done(null, user)
            }

            }catch(err){
                return done(err)
            }
        }
    )
)

