import jwt from "jsonwebtoken"
import envs from "../config/envs.config.js"

export const auth=(req, res, next) =>{

    const token = req.cookies[envs.SECRET];

    if (token) {
        try {
            const usuario = jwt.verify(token, envs.SECRET);
            req.user = usuario;
        } catch (error) {
            console.error('Token inválido:', error.message);
        }
    }

    next()
}