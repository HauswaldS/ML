import jwt from "express-jwt";
import jwks from 'jwks-rsa';


export const getUserFromRequest = () => {
    return jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
        }),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        credentialsRequired: false,
        algorithms: ['RS256']
    });
}

export const isUserAuthenticated = (req, res, next) => {
    const isAuthenticated = req.user && req.user.sub && (req.user.exp * 1000 > new Date().getTime());
    if (isAuthenticated) {
        next()
    } else {
        res.send(403)
    }
}