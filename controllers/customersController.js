const Customer = require('../models/Customer');
const expressAsyncHandler = require('express-async-handler');

const getAllCustomers = expressAsyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find({}).select('-password');
    res.json(customers);
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'No autorizado',
    });
  }
});

const getCustomer = expressAsyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select('-password');
    res.json(customer);
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'No autorizado',
    });
  }
});

const createCustomer = expressAsyncHandler(async (req, res) => {
  const customerExists = await Customer.findOne({ email: req.body.email });

  if (customerExists) {
    res.status(400).json({
      code: 400,
      message: 'El cliente ya existe',
    });
  }

  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se ha podido crear el cliente',
    });
  }
});

const updateCustomer = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      code: 404,
      message: 'Cliente no encontrado',
    });
  }

  customer.address.address =
    req.body.address.address || customer.address.address;
  customer.address.state = req.body.address.state || customer.address.state;
  customer.address.region = req.body.address.region || customer.address.region;
  customer.address.zip = req.body.address.zip || customer.address.zip;
  customer.address.houseOrDept =
    req.body.address.houseOrDept || customer.address.houseOrDept;
  customer.address.numberDept =
    req.body.address.numberDept || customer.address.numberDept;
  customer.birthdate = req.body.birthdate || customer.birthdate;
  customer.gender = req.body.gender || customer.gender;
  customer.sports.mountainSports =
    req.body.sports.mountainSports || customer.sports.mountainSports;
  customer.sports.waterSports =
    req.body.sports.waterSports || customer.sports.waterSports;
  customer.sports.snowSports =
    req.body.sports.snowSports || customer.sports.snowSports;
  customer.sports.inhouseSports =
    req.body.sports.inhouseSports || customer.sports.inhouseSports;
  customer.updated_at = Date.now();

  try {
    await customer.save();
    res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error al actualizar el cliente',
      detail: error.message,
    });
  }
});

const deleteCustomer = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      code: 404,
      message: 'Cliente no encontrado',
    });
  }

  customer.deleted_at = Date.now();
  try {
    await customer.save();
    res.status(200).json({
      id: req.params.id,
      message: 'Usuario eliminado',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error al eliminar el cliente',
      detail: error.message,
    });
  }
});

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};