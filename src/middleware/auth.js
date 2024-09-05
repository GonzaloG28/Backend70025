import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"

export const auth=(req, res, next) =>{

    const token = req.cookies[envs.SECRET]

    if(!token){
        return res.status(401).json({error:`Unauthorized`})
    }
    try {
        const usuario=jwt.verify(token, envs.SECRET)
        req.user=usuario
        next()
    } catch (error) {
        return res.status(401).json({error:`Unauthorized`, descrip:`${error.message}`})
    }
}