import bcrypt from "bcrypt"
import {fileURLToPath} from 'url'
import { dirname } from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//Encripta una contraseña usando bcrypt
export const generarHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//Compara una contraseña en texto plano con su versión encriptada para verificar si coinciden
export const validaPass=(passText, passHash) =>bcrypt.compareSync(passText, passHash)

