import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

//nombre de la coleccion
const productCollection = "products"

//estructura del producto dentro de la coleccion
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    code:{
        type:String,
        unique:true
    },
    stock: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: Array,
        default: []
    }
})

//pugin para utlizar los metodos de paginacion
productSchema.plugin(mongoosePaginate)

//exportacion del modelo
export const productModel = mongoose.model(productCollection, productSchema)
