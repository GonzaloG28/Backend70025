import mongoose from "mongoose"

//nombre de la coleccion
const cartCollection = "carts"

//Estructura del carrito en la coleccion
const cartSchema = new mongoose.Schema({
    products: {
        //array de los productos, almacena el identificador único de un documento, ref indica la coleccion donde estan estos productos
        type: [{
            product: {type: mongoose.Schema.Types.ObjectId, ref: "products"}, 
            quantity: Number,
            //desactiva la generacion automatica de ID para los subdocumentos
            _id: false
        }],
        default: []
    }
})

cartSchema.pre("findOne", function (){
    this.populate("products.product")
})

//exportacion del modelo
export const cartModel = mongoose.model(cartCollection, cartSchema)