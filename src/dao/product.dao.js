import { productModel } from "./models/product.model.js"

//obtener todos los productos
const getAll = async (query, options) => {
    const products = await productModel.paginate(query, options)
    return products
}

//obtener producto por id
const getById = async (id) => {
    const product = await productModel.findById(id)
    return product
}

//crear producto
const create = async (data) => {
    const product = await productModel.create(data)
    return product
}

//actualizar producto
const update = async (id, data) => {
    const product = await productModel.findByIdAndUpdate(id, data, { new: true})
    return product
}

const deleteOne = async (id) => {
    const product = await productModel.findByIdAndDelete(id)
    return product
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}