import jwt from "express-jwt";
import jwks from 'jwks-rsa';
import getDotenv from '../utils/dotenv';

getDotenv();


export const getUserFromRequest = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE_M_TO_M,
    issuer: process.env.AUTH0_ISSUER,
    credentialsRequired: false,
    algorithms: ['RS256']
});

export const isUserAuthenticated = (req, res, next) => {
    const isAuthenticated = req.user && req.user.sub && (req.user.exp * 1000 > new Date().getTime());
    if (isAuthenticated) {
        next()
    } else {
        res.send(403)
    }
}