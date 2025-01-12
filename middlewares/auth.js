const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    
        const token = authorizationHeader.split(' ')[1]; // Extract token after 'Bearer'
    
        if (!token) {
            return res.status(403).json({ success: false, message: 'No token found' });
        }

    try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(userId);

        req.user = { id: userId, isPremium: user.isPremium };
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }
};

module.exports = { authenticate };
