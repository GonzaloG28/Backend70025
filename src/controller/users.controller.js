import { UsuariosService } from "../services/users.service.js"

export default class UsuariosController{
    static async getUsers(req, res){
        try{
            let users=await UsuariosService.getUsers()
        }catch(err){

        }
    }
}