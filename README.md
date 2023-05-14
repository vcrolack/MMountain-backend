En mi gitignore tengo:
node_modules
logs

PD: En un rato linkearé lo que es amongus DB

para abrir el server:
npm run dev

para acceder al localhost:
http://localhost:3500

Instalé estas librerias hasta el momento:

1. `npm i express`: Este comando instala Express, un marco de aplicación web para Node.js que proporciona una serie de características robustas para las aplicaciones web y móviles. 

2. `npm i nodemon -D`: Este comando instala Nodemon como una dependencia de desarrollo (de ahí el `-D`). Nodemon es una utilidad que monitorea cualquier cambio en tu código fuente y reinicia automáticamente tu servidor. Es muy útil durante el desarrollo para ahorrar tiempo al no tener que reiniciar manualmente tu servidor cada vez que hagas un cambio.

3. `npm i date-fns uuid`: Este comando instala dos librerías. `date-fns` es una librería de JavaScript para manipular fechas de una forma más cómoda y eficiente. `uuid` es una librería que permite generar identificadores únicos universales (UUID), que pueden ser útiles para identificar registros, usuarios, o cualquier otra entidad en tu aplicación.

4. `npm i cookie-parser`: Este comando instala cookie-parser, un middleware que se usa para analizar las cookies que se adjuntan a las solicitudes de los clientes. Esto es útil para manejar sesiones de usuario o personalizar la experiencia del usuario.

5. `npm i cors`: Este comando instala CORS (Cross-Origin Resource Sharing), un paquete de Node.js que proporciona un middleware para habilitar CORS en tu aplicación. CORS ess una tecnología de seguridad que permite a tu aplicación controlar el intercambio de recursos con otros orígenes (dominios).

6. `npm i dontenv`: En un proyecto MERN Stack (MongoDB, Express.js, React.js, Node.js), las variables de entorno son una manera de manejar la configuración de tu aplicación, como las cadenas de conexión a la base de datos, las claves secretas, las URL de la API, y otras configuraciones sensibles. Al utilizar dotenv, puedes mantener estas configuraciones sensibles fuera de tu código, lo que es una buena práctica de seguridad y configuración. Esto también facilita la modificación de la configuración entre diferentes entornos (por ejemplo, desarrollo, prueba, producción), ya que solo necesitas cambiar el archivo .env.

7. `npm i mongoose`: Mongoose es una biblioteca de Node.js que proporciona una capa de abstracción sobre MongoDB, facilitando la definición de esquemas, validación, consultas y relaciones de datos en tu base de datos. Al instalar Mongoose con `npm i mongoose`, estás añadiendo estas potentes funcionalidades a tu proyecto MERN Stack, simplificando el manejo de datos y mejorando la seguridad y la integridad de tus datos en MongoDB.

8. `npm i mongoose-sequence`: La librería mongoose-sequence es un plugin para Mongoose que permite generar números de secuencia automáticos para cualquier esquema Mongoose, lo cual es útil para casos como la creación de números de identificación autoincrementados. Al instalarlo con npm i mongoose-sequence, puedes incorporar esta funcionalidad en tus esquemas de Mongoose, lo que permite, por ejemplo, asignar un número de pedido único y autoincrementado en un sistema de gestión de pedidos.

9. `npm i express-async-handler`: Este paquete es un middleware para manejar excepciones dentro de las funciones asíncronas de ruta y middleware en Express.js. Sin esto, tendrías que envolver cada función asíncrona en un bloque try/catch para manejar correctamente los errores asíncronos. express-async-handler simplifica esto al proporcionar un wrapper que maneja automáticamente los errores y los pasa al middleware de manejo de errores de Express.

10. `npm i bcrypt`: Este paquete es una biblioteca para ayudarte a hash y verificar contraseñas en Node.js. bcrypt te permite encriptar las contraseñas de una manera segura antes de almacenarlas en la base de datos. También proporciona funciones para comparar una contraseña ingresada con la versión encriptada almacenada en la base de datos, lo que es útil para la autenticación de usuarios.

11. `npm i jsonwebtoken`: La librería jsonwebtoken, también conocida como jwt, se utiliza en aplicaciones web para manejar JSON Web Tokens (JWTs), que son una forma segura y compacta de representar reclamaciones entre dos partes. En el desarrollo de aplicaciones MERN Stack, esta librería es fundamental para la autenticación y la autorización de los usuarios, ya que permite generar tokens de acceso seguros y verificar su validez en cada solicitud. También permite intercambiar información de manera segura entre partes mediante la firma y/o el cifrado de los datos contenidos en los tokens.
