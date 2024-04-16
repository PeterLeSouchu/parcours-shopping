const express = require('express');
const router = express.Router();
// controllers
const catalogController = require('./controllers/catalogController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

const initCart = require('../middlewares/initCart');
const cartCalculations = require('../middlewares/cartCalculations');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const cartController = require('./controllers/cartController');

// Page d'accueil
router.get('/', initCart, catalogController.index);

// !! page /shop, vous travaillez dans ce controller
router.get('/shop', initCart, catalogController.productsList);

// Affichage d'une catégorie et des produits associés
router.get('/category/:id', initCart, catalogController.category);

// Page de détail d'un produit
router.get('/product/:id', initCart, catalogController.product);

//Page du panier
// Ces routes nes sont pas terminées
router.get('/cart', [initCart, cartCalculations], cartController.index);
// Page qui va permettre d'ajouter un produit au panier
router.post('/cart/:productId', initCart, cartController.addOrUpdate);
// Page qui va permettre d'enlever un produit du panier
router.get('/cart/remove/:productId', initCart, cartController.remove);
//Vider le panier
router.get('/cart/destroy', initCart, cartController.destroy);

// Affichage page formulaire de login
router.get('/login', initCart, sessionController.index);
//!! Démarre une session user si user existe, vous travaillez dans ce controller
router.post('/login', sessionController.login);

// !! Bonus : Logout, vous travaillez dans ce controller
router.get('/logout', initCart, sessionController.logout);

// Affichage page formulaire register
router.get('/register', initCart, userController.index);
// !! Bonus : Create user, si vous avez le temps, essayez de faire fonctionner ce formulaire.
router.post('/register', userController.register);

// user profile avec middleware
router.get('/profile', [initCart, auth], userController.show);
// admin avec chained middlewares
router.get('/dashboard', [auth, isAdmin, initCart], adminController.index);

module.exports = router;
