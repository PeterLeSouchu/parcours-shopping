const auth = require('../../middlewares/auth');

describe('authentification middleware', () => {
    it('should call next() if user is connected', () => {
        const req = { session: { user: true } }; // user connected
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(next).toHaveBeenCalledWith();
        expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    });
    it('should call next(error) if user is not connected', () => {
        const req = { session: {} }; // user not connected
        const next = jest.fn();

        auth(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(req.status).toBe(403);
    });
});
