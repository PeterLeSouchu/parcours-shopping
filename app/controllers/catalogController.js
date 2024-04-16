const { Category, Product } = require('../models');

const pretty = obj => JSON.stringify(obj, null, 2);
const cpretty = obj => console.log(pretty(obj));

const catalogController = {
    index: async (req, res) => {
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
        //On récupère l'id de la categorie cliquée de la route paramétrée
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId, {
            include: [
                {
                    association: 'products',
                },
            ],
        });
        cpretty(category);

        res.render('category', { category });
    },

    product: async (req, res) => {
        // todo, récupérer le produit demandé en base de données.
        res.render('product');
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
