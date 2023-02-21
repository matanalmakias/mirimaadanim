import jwt from "jsonwebtoken";

import authConfig from "../../db/config/auth.config.js";

const validateToken = (req, res, next) => {
  //get the header from the request:
  const token = req.headers.authorization;

  if (!token) {
    //403 = unauthorized
    return res.status(403).json({ message: "No Token Provided" });
  }

  jwt.verify(token, authConfig.secret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    //get the user id from the payload:
    //ts defintion for id in payload
    // const jwtPayload = payload as {id: string}
    const id = payload.id;

    //add the userId to the request ->
    req.userId = id;
    next();
  });
};

export { validateToken };
