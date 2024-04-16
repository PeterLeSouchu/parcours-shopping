const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            const { name, email, password, passwordConfirm } = req.body;
            // !! votre code à partir d'ici
            // On vérifie l'email avec le package npm email-validator
            emailValidator.validate(email);

            // On vérifie si les mdp correspondent
            if (password !== passwordConfirm) {
                res.status(400).send('Les mots de passe ne correspondent pas');
                return;
            }
            // On vérifie si l'utilisateur existe en BDD
            const userWithSameEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (userWithSameEmail) {
                // Si il existe déjà un utilisateur avec cet email, on l'envoie sur la page de connexion
                res.redirect('/login');
                return;
            }

            // On hash le mdp avec un nombre de tour de hachage de 10
            const passwordHashed = await bcrypt.hash(password, 10);

            // On va chercher en bdd le role customer que l'on stocke dans une varaible.
            const role = await Role.findOne({
                where: {
                    name: 'customer',
                },
            });

            // On créer  l'utilisateur avec le role customer en l'inserant en BDD
            await User.create({
                name,
                email,
                password: passwordHashed,
                role_id: role.id,
            });

            // !! ne pas modifier cette ligne
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
