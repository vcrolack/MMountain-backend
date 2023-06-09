const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const routerApi = require('./routes/index');
const { verifyToken } = require('./middleware/verifyToken');

require('dotenv').config();

const PORT = process.env.PORT || 3500;
const app = express();

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(verifyToken());

routerApi(app);

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => console.log(`Server abierto en el puerto ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
