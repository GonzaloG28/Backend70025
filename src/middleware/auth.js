import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"

export const auth=(req, res, next) =>{
    if(!req.headers.authorization){
        res.setHeader("Content-Type", "application/json")
        return res.status(401).json({err:"Unauthorized"})
    }

    let user
    let token = req.headers.authorization.split(" ")[1]
    try{
        user=jwt.verify(token, envs.SECRET)
    }catch(err){
        res.setHeader("Content-Type", "application/json")
        return res.status(401).json({err:"Unauthorized", msg:`${err.message}`})
    }

    req.user = user
    next()
}