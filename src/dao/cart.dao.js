import { cartModel } from "./models/cart.model.js"
import mongoose from "mongoose"

//obtener carrito por id
const getById= async(id) =>{
    const cart = await cartModel.findById(id)
    return cart
}


//crear carrito
const create = async (data) => {
    const cart = await cartModel.create(data)
    return cart
}


//añadir producto al carrito
const addProductToCart = async (cid, pid) =>{
    const productInCart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid},
        { $inc: {"products.$.quantity": 1}},
        //$inc: operador de incremento, se utiliza para incrementar el valor de un campo numerico en la cantidad especificada
        //"products.$.product"
        //products: nombre del array  / $: operador de posicion, selecciona el elemento correcto del array para la actualizacion / quantity: campo donde incrementaremos valor
        { new: true}
    )

    if(!productInCart) {
        await cartModel.updateOne({ _id: cid },{ $push: { products: { product: pid, quantity: 1} } })
    }

    const cart = await cartModel.findById(cid)

    return cart
}


//eliminar producto del carrito
const deleteProductInCart = async (cid, pid) =>{

    //encuentra el carrito por id
    const cart = await cartModel.findById(cid)

    //filtra los productos para eliminar el producto especificado
    const productsFilter = cart.products.filter(prod => prod.product._id.toString() !== pid)
    //actualiza el carrito con el array de productos filtrados
    const cartResponse = await cartModel.findByIdAndUpdate(cid, { $set: { products: productsFilter } }, { new: true } )
    
    return cartResponse
}


//actualizar cantidad de un producto
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    const cart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid},
        { $set: { "products.$.quantity": quantity }},
        { new: true }
    )

    return cart
}


//eliminar todos los productos de un carrito
const deleteAllProductsInCart = async (cid) =>{
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: []}}, { new:true })

    return cart
}


export default {
    getById,
    create,
    addProductToCart,
    deleteProductInCart,
    updateQuantityProductInCart,
    deleteAllProductsInCart
}