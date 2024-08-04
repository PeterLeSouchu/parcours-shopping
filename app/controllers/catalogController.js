const { Category, Product } = require('../models');

// Utiliser  la fonction cpretty pour voir le resultat de la requete sequilize (permet de mieux s'y retrouver) :
// const pretty = obj => JSON.stringify(obj, null, 2);
// const cpretty = obj => console.log(pretty(obj));

const catalogController = {
    index: async (req, res) => {
        console.log(req.session);
        res.render('index');
    },

    productsList: async (req, res) => {
        try {
            // todo, ici il faudra les vrais produits et catégories de la db
            const products = await Product.findAll();
            const categories = await Category.findAll();

            res.render('shop', {
                categories,
                products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    category: async (req, res) => {
        const categoryId = parseInt(req.params.id);
        const category = await Category.findByPk(categoryId, {
            include: [
                {
                    association: 'products',
                },
            ],
        });

        res.render('category', { category });
    },

    product: async (req, res) => {
        //On récupère l'id du produit cliqué de la route paramétrée
        const productId = parseInt(req.params.id);
        const product = await Product.findByPk(productId);

        res.render('product', { product });
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
