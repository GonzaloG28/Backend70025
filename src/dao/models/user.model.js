import mongoose from "mongoose"

//representa una colección de usuarios en Mongo
export const userModel = mongoose.model(
    "users",
    //estructura de los documentos dentro de la colección
    new mongoose.Schema(
        {
            first_name: String,
            last_name: String,
            email:{
                type: String,
                unique: true
            },
            age: Number,
            password: String,
            cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Carts"
            },
            role:{
                type:String,
                default: "user"
            }
        },
        {
            timestamps: true
        }
    )
)