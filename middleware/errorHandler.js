/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { logEvents } = require('./logger') // importa la función logEvents del archivo logger.js

const errorHandler = (err, req, res, next) => { // define una función middleware que maneja errores
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log') // registra un registro de error utilizando la función logEvents y el archivo de registro errLog.log
    console.log(err.stack) // muestra el stack trace del error en la consola

    const status = res.statusCode ? res.statusCode : 500 // obtiene el código de estado HTTP de la respuesta, o establece el código en 500 (error de servidor) si no se ha establecido

    res.status(status) // establece el código de estado de la respuesta en el código de estado HTTP recuperado o 500

    res.json({ message: err.message }) // devuelve una respuesta JSON con un mensaje de error
}

module.exports = errorHandler // exporta la función middleware de manejo de errores para que se pueda utilizar en otros archivos
