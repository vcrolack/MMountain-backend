const allowedOrigins = require('./allowedOrigins') // importa la matriz de orígenes permitidos del archivo allowedOrigins.js

const corsOptions = { // define un objeto de opciones de CORS
    origin: (origin, callback) => { // define una función que comprueba si el origen de la solicitud está permitido
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // comprueba si el origen de la solicitud está en la matriz de orígenes permitidos o si no hay origen especificado (lo que significa que se trata de una solicitud de misma página)
            callback(null, true) // llama al callback con nulo para indicar que el origen está permitido y que se debe continuar con la solicitud
        } else {
            callback(new Error('No permitido por CORS')) // llama al callback con un error para indicar que el origen no está permitido y que la solicitud debe detenerse
        }
    },
    credentials: true, // indica que se deben incluir cookies y encabezados de autenticación en las solicitudes CORS
    optionsSuccessStatus: 200 // establece el código de estado HTTP para las respuestas preflight OPTIONS a 200, smart TV y algunos browsers tienen problemas con el success status 204
}

module.exports = corsOptions // exporta el objeto de opciones de CORS para que se pueda utilizar en otros archivos
