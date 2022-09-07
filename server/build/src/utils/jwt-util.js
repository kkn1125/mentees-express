import jwt from "jsonwebtoken";
const secret = process.env.SECRET;
export default {
    sign: (user) => {
        const payload = {
            email: user.email,
        };
        return jwt.sign(payload, secret, {
            algorithm: "HS256",
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                ok: true,
                email: decoded.email,
                iat: decoded.iat,
            };
        }
        catch (e) {
            return {
                ok: false,
                message: e.message,
            };
        }
    },
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: "HS256",
            expiresIn: "14d",
        });
    },
};
