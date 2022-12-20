const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// conectar mongo
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
MONGO_URL = 'mongodb://127.0.0.1/restapis';

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Conectado...'))
    .catch((err) => console.log(err));

// crear el servidor
const app = express();

// habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas de la app
app.use('/', routes());

// puerto
app.listen(5000);

