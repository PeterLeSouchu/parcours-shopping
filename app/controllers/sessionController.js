const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // /On regarde si notre utilisateur existe en BDD
            const user = await User.findOne({
                where: {
                    email: email,
                },
                include: {
                    association: 'role',
                },
            });

            // Si l'utilisateur n'est pas dans la BDD on renvoie vers la page login avec un message d'erreur
            if (!user) {
                res.render('login', {
                    error: 'Utilisateur ou mot de passe incorrect',
                });
                return;
            }

            // On compare le MDP de l'utilisateur avec celui de la BDD
            const passwordMatched = await bcrypt.compare(
                password,
                user.password
            );

            // Si le MDP ne correspond pas on renvoie vers la page login avec un message d'erreur
            if (!passwordMatched) {
                res.render('login', {
                    error: 'Utilisateur ou mot de passe incorrect',
                });
                return;
            }

            // On ajoute user a la session
            req.session.user = user;

            // On enlève le mot de passe de la session.
            req.session.user.password = undefined;

            // !! Ne pas modifier cette ligne
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici
        res.redirect('/');
    },
};

module.exports = sessionController;
