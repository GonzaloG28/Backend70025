import mongoose from "mongoose"

//representa una colección de usuarios en Mongo
export const userModel = mongoose.model(
    "users",
    //estructura de los documentos dentro de la colección
    new mongoose.Schema(
        {
            name: String,
            email:{
                type: String, unique:true
            }, 
            password: String
        },
        {
            timestamps: true
        }
    )
)