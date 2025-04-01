import jwt from "jsonwebtoken"

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET, { expiresIn: '30min' });
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET, { expiresIn: '10min' });
}

