const express = require('express');
const router = express.Router();
// controllers
const catalogController = require('./controllers/catalogController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

const initCart = require('../middlewares/initCart');
const cartCalculations = require('../middlewares/cartCalculations');
const cartController = require('./controllers/cartController');
// Middleware to check if user is connected
const auth = require('../middlewares/auth');
// Middleware to check if user  has the good role
const isAdmin = require('../middlewares/isAdmin');

router.get('/', initCart, catalogController.index);
router.get('/shop', initCart, catalogController.productsList);
router.get('/category/:id', initCart, catalogController.category);
router.get('/product/:id', initCart, catalogController.product);
router.get('/login', initCart, sessionController.index);
router.get('/logout', initCart, sessionController.logout);
router.get('/register', initCart, userController.index);
router.get('/dashboard', [auth, isAdmin, initCart], adminController.index);
router.get('/profile', [initCart, auth], userController.show);

router.post('/cart/:productId', initCart, cartController.addOrUpdate);
router.post('/login', sessionController.login);
router.post('/register', userController.register);

module.exports = router;
