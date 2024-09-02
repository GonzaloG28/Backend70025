

//funcion que crea el producto con los datos que se ingresen en el cuerpo de la solicitud
export const checkProductData = async(req, res, next) => {
    try{
        const { title, description, code, price, stock, category, thumbnails } = req.body
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
        }

        //funcion que verifica que se completen todos los campos excepto thumbnails
        if(!title || !description || !code || !price || !stock || !category){
            return res.status(400).json({ status:"error", msg:"Todos los campos son obligatorios, excepto thumbnails"})
        }
        //permite que continue la ejecucion del endpoint
        next()

    }catch(err){
        console.log(err)
    }
}