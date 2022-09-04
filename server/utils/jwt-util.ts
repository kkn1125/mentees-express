import { error } from "console";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export default {
  sign: (user: { email: string }) => {
    const payload = {
      email: user.email,
    };
    return jwt.sign(payload, secret as jwt.Secret, {
      algorithm: "HS256",
    });
  },
  verify: (token: string) => {
    let decoded: any = null;
    try {
      decoded = jwt.verify(token, secret as jwt.Secret);
      return {
        ok: true,
        email: decoded.email,
        iat: decoded.iat,
      };
    } catch (e: any) {
      return {
        ok: false,
        message: e.message,
      };
    }
  },
  refresh: () => {
    return jwt.sign({}, secret as jwt.Secret, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
};
