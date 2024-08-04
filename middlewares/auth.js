const auth = (req, res, next) => {
    // When user is connected, we put him in session, so here we can check if session is available
    if (req.session.user) {
        // If it's true we next
        return next();
    }

    // Else we pass control to the error middleware
    req.status = 403;
    return next(new Error('Forbidden'));
};

module.exports = auth;
