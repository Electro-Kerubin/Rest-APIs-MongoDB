const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function() {
    router.get('/', (req, res) => {
        res.send('inicio')
    });

    router.get('/nosotros', (req,res) => {
        res.send('nosotros')
    });

    // ** CLIENTES **
    //Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra un cliente por id
    router.get('/clientes/:idCliente', clienteController.mostrarClientePorId);

    // Actualizar cliente por id
    router.put('/clientes/:idCliente', clienteController.actualizarClientePorId);

    // eliminar un cliente por id
    router.delete('/clientes/:idCliente', clienteController.eliminarClientePorId);

    // ** PRODUCTOS **
    // Nuevo producto
    router.post('/productos', productoController.subirArchivo, productoController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', productoController.mostrarProductos);

    //Muestra un producto por id
    router.get('/productos/:idProducto', productoController.mostrarProductoPorId);

    //Actualizar producto por id
    router.put('/productos/:idProducto', productoController.subirArchivo, productoController.actualizarProductoPorId);

    // Eliminar producto por id
    router.delete('/productos/:idProducto', productoController.eliminarProductoPorId);

    // ** PEDIDOS **
    //Nuevo pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    //mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);
    
    //Mostrar pedidos por id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedidoPorId);
    
    //Actualizar pedidos por id
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedidoPorId);

    //Eliminar pedidos por id
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedidoPorId);

    return router;
}