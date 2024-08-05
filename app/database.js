const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Utilisé pour bypasser le certificat non sécurisé, si nécessaire
        },
    },
    // logging false pour ne pas polluer le terminal avec les requêtes
    // si on veut voir les requêtes, il faut enlever cette ligne
    // logging: false,
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
});

module.exports = sequelize;
