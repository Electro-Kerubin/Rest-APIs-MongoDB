const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje : 'Se agregó un nuevo pedido '});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un pedido por su id
exports.mostrarPedidoPorId = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    try {
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.json({ mensaje : 'Pedido no existe.' });
        next();
    }
}

// Actualizar pedido por id
exports.actualizarPedidoPorId = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id : req.params.idPedido }, req.body, { new : true });
        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar un pedido por id
exports.eliminarPedidoPorId = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id : req.params.idPedido });
        res.json({ mensaje : 'El pedido se ha eliminado.'});
    } catch (error) {
        console.log(error);
        next();
    }
}