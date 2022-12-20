const Productos = require('../models/Productos')

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    },
}

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error});
        }
        return next();
    })
}

// Crea nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file) {
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({ mensaje : 'se agrego un nuevo producto.' })
    } catch (error) {
        console.log(error)
        next();
    }
}

// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en especifico por id
exports.mostrarProductoPorId = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        res.json({mensaje : 'Ese producto no existe'});
        console.log(error);
        next();
    }
}

//Actualiza un producto por id
exports.actualizarProductoPorId = async (req, res, next) => {
    try {

        let productoAnterior = await Productos.findById(req.params.idProducto);

        let nuevoProducto = req.body;

        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id : req.params.idProducto}, 
            nuevoProducto, {
                new : true,
            });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un producto por id
exports.eliminarProductoPorId = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({ _id : req.params.idProducto });
        res.json({mensaje : 'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}