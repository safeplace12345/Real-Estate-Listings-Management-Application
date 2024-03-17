import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../constants";
import { errorHandler } from "../utils/errorHandler";
import validator from "validator";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) {
    return res.status(401).send(errorHandler.authXExpMsg);
  }
  const token = authorization?.split(" ")[1];
  if (!token || !validator.isJWT(token))
    return res.status(401).send(errorHandler.authTknSignExpMsg);
 
    try {
    const user = jwt.verify(token, secret);
    if (!user) {
      return res.status(401).send(errorHandler.authInvalidExpMsg);
    }

    req.body.user = user;
    return next();
  } catch (error) {
    return res.status(401).send(errorHandler.authTknSignExpMsg);
  }
};
