const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

module.exports = function() {
    router.get('/', (req, res) => {
        res.send('inicio')
    });

    router.get('/nosotros', (req,res) => {
        res.send('nosotros')
    });

    //Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra un cliente por id
    router.get('/clientes/:idCliente', clienteController.mostrarClientePorId);

    // Actualizar cliente por id
    router.put('/clientes/:idCliente', clienteController.actualizarClientePorId);

    return router;
}