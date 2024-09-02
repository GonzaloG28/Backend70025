import bcrypt from "bcrypt"

//Encripta una contraseña usando bcrypt
export const generarHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//Compara una contraseña en texto plano con su versión encriptada para verificar si coinciden
export const validaPass=(passText, passHash) =>bcrypt.compareSync(passText, passHash)