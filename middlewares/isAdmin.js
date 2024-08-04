const isAdmin = (req, res, next) => {
    // Check if role is admin
    if (req.session.user.role.name === 'admin') {
        // If it's true we next
        return next();
    }

    // Else we pass control to the error middleware
    req.status = 401;
    return next(new Error('Unauthorized'));
};

module.exports = isAdmin;
