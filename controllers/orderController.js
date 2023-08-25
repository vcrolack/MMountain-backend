const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Order = require('../models/order');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

/* *** Controllers for superadmin and maintainer routes *** */

const getAllOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({
        code: 404,
        message: 'Órdenes no encontradas',
      });
    }
    return res.status(200).json({
      code: 200,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al obtener las órdenes',
      error: error.message,
    });
  }
});

const getOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({
        code: 400,
        message: 'Orden no encontrada',
      });
    }

    return res.status(200).json({
      code: 200,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: `Ha ocurrido un error al buscar la orden con el id ${req.params.id}`,
      error: error.message,
    });
  }
});

const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.create({
      user: req.body.user,
      status: 'pendiente',
      total: req.body.total,
      address: req.body.address,
      state: req.body.state,
      region: req.body.region,
      zip: req.body.zip,
      houseOrDept: req.body.houseOrDept,
      numberDept: req.body.numberDept || null,
      phone: req.body.phone,

    });

    return res.status(201).json({
      code: 201,
      message: 'Orden creada',
      data: order,
    });
  } catch (error) {
    console.log('hola');
  }
});

const updateOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      order.address = req.body.address || order.address;
      order.state = req.body.state || order.status;
      order.zip = req.body.state || order.zip;
      order.houseOrDept = req.body.houseOrDept || order.houseOrDept;
      order.numberDept = req.body.numberDept || order.numberDept;
      order.products = req.body.products || order.products;
      order.updateAt = Date.now();

      const updateOrder = await order.save();

      return res.status(200).json({
        code: 200,
        message: `Orden N°${order.orderNumber} ha sido actualizada`,
        data: updateOrder,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al actualizar la orden',
      error: error.message,
    });
  }
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.deletedAt = Date.now();
      await order.save();

      return res.status(200).json({
        code: 200,
        message: `Orden N°${order.orderNumber} eliminada`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al eliminar la orden',
      error: error.message,
    });
  }
});

const restoreOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order && order.deletedAt) {
      order.deletedAt = null;
      await order.save();

      return res.status(200).json({
        code: 200,
        message: `La orden N°${order.orderNumber} ha sido restaurada`,
      });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(404).json({
        code: 404,
        message: 'Usuario no encontrado',
      });
    }

    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al restaurar la orden',
    });
  }
});

/* *** Controllers for customer routes *** */

const getMyOrders = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const orders = await Order.find({ user: userId });

    return res.status(200).json({
      code: 200,
      data: orders,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        code: 401,
        message: 'Token inválido',
        error: error.message,
      });
    }

    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const getOneMyOrder = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        code: 400,
        message: 'ID de orden inválido',
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: 'Orden no encontrada',
      });
    }

    return res.status(200).json({
      code: 200,
      data: order,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        code: 401,
        message: 'Token invalido',
        error: error.message,
      });
    }
  }
});

const createMyOrder = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const {
      products,
      total,
      address,
      state,
      region,
      zip,
      houseOrDept,
      numberDept,
    } = req.body;

    const orderData = {
      user: userId,
      status: 'pending',
      total,
      address,
      state,
      region,
      zip,
      houseOrDept,
      numberDept,
      products,
    };

    const order = await Order.create(orderData);

    await User.findByIdAndUpdate(userId, {$push: {'customer.orders': order._id}});

    return res.status(201).json({
      code: 201,
      message: 'Orden creada',
      data: order,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        code: 401,
        message: 'Token inválido',
        error: error.message,
      });
    }

    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  restoreOrder,
  getMyOrders,
  getOneMyOrder,
  createMyOrder,
};
