const express = require('express');
const path = require('path');
const usersRouter = require('./userRoutes');
const rootRouter = require('./root');
const customerRouter = require('./customerRoutes');
const authRouter = require('./authRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');


const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customer', customerRouter);
  router.use('/auth', authRouter);
  router.use('/categories', categoryRouter);
  router.use('/products', productRouter);
  router.use('/', rootRouter);
  router.use('/', express.static(path.join(__dirname, 'public')));

  router.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '../views/404.html'));
    } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' });
    } else {
      res.type('txt').send('404 Not Found');
    }
  });
}

module.exports = routerApi;
