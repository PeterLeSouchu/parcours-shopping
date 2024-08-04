const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Role = require('./Role');

Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products', // name of relation that we will use in controllers to make joins
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
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
