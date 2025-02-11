import createError from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;
    console.log(token);
    if (!token) {
        return next(createError(400, "Not Authenticated!"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        // jwt.verify(token, process.env.JWT, (err, decodedToken) => {
        if (err) return next(createError(403, "Token is not valid"));
        // if the token is verified, here this user parameter contains the data that we send at the time of creating token, here we had sent '_id' so user will contains '_id' and may contains other data also.
        // now here we are setting user data to the "req.user"

        req.user = user;  // Store the decoded token data in `req.user`
        // req.user = decodedToken;
        next();
    });
};