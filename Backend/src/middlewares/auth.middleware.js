import jwt from 'jsonwebtoken';
import User  from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided.' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized, invalid token.' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protectRoute: ', error);
        res.status(401).json({ message: 'Unauthorized, invalid token.' });
    }
}