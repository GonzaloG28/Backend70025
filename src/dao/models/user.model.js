import mongoose from "mongoose"

//representa una colección de usuarios en Mongo
export const userModel = mongoose.model(
    "users",
    //estructura de los documentos dentro de la colección
    new mongoose.Schema(
        {
            first_name:{type: String},
            last_name: {type: String},
            age:{type: Number},
            email:{
                type: String, 
                unique:true
            }, 
            password: {type: String},
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts',
            },
            role: {
                type: String,
                default: 'user'
            }
        },
        {
            timestamps: true
        }
    )
)