// middlewares/auth.middleware.js
const { verifyAccessToken } = require('../utils/jwt.utils.js');

const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const token = header.split(' ')[1];
        const payload = verifyAccessToken(token);
        req.user = payload; // payload.userId, etc.
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', err });
    }
};

// Si tu veux supprimer la gestion des roles (puisque tu n’en utilises pas)
const authorize = (roles = []) => {
    return (req, res, next) => {
        // si roles vide, autorise tout
        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};
