const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Role = require('./Role');

Category.hasMany(Product, {
    foreignKey: 'category_id',
    //products avec un 's' car plusieurs produits
    as: 'products',
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    //Category au singulier car une seule possible
    as: 'category',
});

Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});

module.exports = { User, Category, Product, Role };
