const Clientes = require('../models/Clientes')

// Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body)

    try {
        await cliente.save();
        res.json({ mensaje: 'Se agrego correctamente un nuevo cliente.'});
    } catch (error) {
        console.log(error);
        
        next();
    }

}

// Mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next();
    }
}

//Muestra cliente por id
exports.mostrarClientePorId = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    try {
        res.json(cliente);
    } catch (error) {
        res.json({mensaje : 'Cliente no existe'});
        next();
    }
}

// Actualizar cliente por id
exports.actualizarClientePorId = async (req, res, next) => {

    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id : req.params.idCliente }, 
            req.body, {
                new : true
            });
            res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}