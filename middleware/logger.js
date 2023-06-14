/* eslint-disable no-console */
const { format } = require('date-fns') // para formatear la fecha y hora
const { v4: uuid } = require('uuid') // para generar un identificador único
const fs = require('fs') // para escribir en el sistema de archivos
const fsPromises = require('fs').promises // para manejar promesas con fs
const path = require('path') // para trabajar con rutas de archivo

// Función para registrar eventos y mensajes de registro en un archivo de registro
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss') // crear una marca de tiempo con la fecha y hora actuales
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` // crear un nuevo registro con la marca de tiempo, un identificador único y el mensaje

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) { // verificar si el directorio de registro existe o no
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) // si no existe, crearlo
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem) // agregar el nuevo registro al archivo de registro
    } catch (err) {
        console.log(err) // manejar cualquier error que ocurra durante la escritura del archivo de registro
    }
}

// Función de middleware para registrar solicitudes entrantes en la aplicación
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log') // registrar la solicitud entrante utilizando la función "logEvents"
    console.log(`${req.method} ${req.path}`) // registrar la solicitud en la consola con el método HTTP y la ruta
    next() // llamar a la función "next" para pasar la solicitud al siguiente middleware
}

// Exportar las funciones "logEvents" y "logger" para que puedan ser utilizadas en otros archivos de Node.js
module.exports = { logEvents, logger }
