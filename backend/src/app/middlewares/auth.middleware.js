import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.setHeader('Set-Cookie', `token=; max-age=0; path=/`).redirect('/login');
    }
};