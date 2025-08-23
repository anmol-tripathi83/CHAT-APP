import jwt from "jsonwebtoken";   // package that allow us to handle the authentication


// Jwt config file and also taking care of cross site access

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  // in msec
        httpOnly: true,     // prevent XSS attacks cross-site scripting attacks   (so that token can not be accesed by JS)
        samesite: "strict",    // CSRF attacks cross site request forgery attacks
        secure: process.env.NODE_ENV !== "development" ,   // it gonna be true is it is in production
    });
    return token;
}