import jwtUtil from "../utils/jwt-util.js";

const { verify } = jwtUtil;

const authJWT = (req: any, res: any, next: any) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verify(token);
    if (result.ok) {
      req.email = result.email;
      next();
    } else {
      res.status(401).json({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      message: "인증 토큰 정보가 존재하지 않습니다.",
    });
  }
};

export default authJWT;
