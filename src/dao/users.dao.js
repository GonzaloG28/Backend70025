import { userModel } from "./models/user.model.js"

export class UsuariosDao{
    static async getBy(filtro={}){
        return await userModel.findOne(filtro).lean()
    }

    static async create(user){
        return (await userModel.create(user)).toJSON()
    }
}