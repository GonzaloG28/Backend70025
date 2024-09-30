import { UsuariosDao as DAO } from "../dao/users.dao.js"
//capa intermedia entre el controlador y la persistencia
//impide que los accesos a persistencia se hagan descontroladamente
class UsuariosService{
    constructor(dao){
        this.dao=dao
    }

    async getUsers(){
        return await this.dao.getBy()
    }

    async createUsers(){
        return await this.dao.create()
    }
}

export const UsuariosService = new UsuariosService(DAO)