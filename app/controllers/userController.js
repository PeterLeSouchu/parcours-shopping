const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            const { firstname, lastname, email, password, passwordConfirm } =
                req.body;
            // Verify email with package npm email-validator
            emailValidator.validate(email);

            // Verification if password and passwordConfirm are similar
            if (password !== passwordConfirm) {
                res.status(400).send('Les mots de passe ne correspondent pas');
                return;
            }
            // Verification if user already exists
            const userWithSameEmail = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (userWithSameEmail) {
                // If user exists, we redirect him to login page
                res.redirect('/login');
                return;
            }

            // Password hashed before insertion in database
            const passwordHashed = await bcrypt.hash(password, 10);

            // Search role in database
            const role = await Role.findOne({
                where: {
                    name: 'customer',
                },
            });

            // Create user with the role 'customer' and hashed password
            await User.create({
                name: `${firstname} ${lastname}`,
                email,
                password: passwordHashed,
                role_id: role.id,
            });

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
