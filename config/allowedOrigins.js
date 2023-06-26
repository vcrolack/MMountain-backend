const allowedOrigins = [ // define una matriz de cadenas que representan los orígenes permitidos para las solicitudes
    'http://localhost:3000', // permite solicitudes desde localhost en el puerto 3000
    'https://www.MMointain.cl', // permite solicitudes desde www.MMountain.cl con HTTPS
    'https://MMountain.cl', // permite solicitudes desde MMountain.cl con HTTPS
    'https://mmountain-backend-production.up.railway.app/'
]

module.exports = allowedOrigins // exporta la matriz de orígenes permitidos para que se pueda utilizar en otros archivos
