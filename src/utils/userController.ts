import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import { IUser } from "../lib/schemas/user";

import { usersModel } from "../lib/schemas/user";
import { errorHandler } from "./errorHandler";
import { secret } from "../constants";

class UserController {
  async loginUser(req: Request, res: Response) {
    const { email } = req.body;
    if (!validator.isEmail(email))
      return res.status(401).send(`${errorHandler.validatorExpMsg} ${email}`);

    try {
      const user = await usersModel.findOne({ email });
      if (!user) {
        return res.status(401).json(errorHandler.userExpMsg);
      }
      const token = jwt.sign(
        { uid: user.uid, name: user.name, email },
        secret,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      await user.save();
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(errorHandler.serverExpMsg);
    }
  }
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!validator.isEmail(email))
      return res.status(401).send(`${errorHandler.validatorExpMsg} ${email}`);
    if (!validator.isAlpha(name))
      return res.status(401).send(`${errorHandler.validatorExpMsg} ${name}`);

    const uid = `ex-ls-ap-${Math.random() * 11}`;
    const token = jwt.sign({ uid, name, email }, secret, {
      expiresIn: "1h",
    });

    try {
      const user = await new usersModel({
        uid,
        name,
        email,
        token,
        favorites: [],
      }).save();
      if (!user) {
        return res.status(401).json({ message: errorHandler.createUserExpMsg });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(errorHandler.serverExpMsg);
    }
  }

  async updateFavList (req: Request, res: Response, _: NextFunction) {
    const {
      body: { fav, user },
    } = req;
    try {
      const toUpdate: IUser | null = await usersModel.findOne({
        email: user.email,
      });

      if (!toUpdate || !toUpdate.favorites) {
        return res.status(401).send(errorHandler.userExpMsg);
      }
      toUpdate.favorites = [...toUpdate.favorites, ...fav];
      const updated = await toUpdate.save();
      return res.json(updated);

    } catch (error) {
      console.log(error);
      return res.status(500).send(errorHandler.serverExpMsg);
    }
  }

  async deleteFromFavList (req: Request, res: Response, _: NextFunction) {
    const {
      body: { fav, user },
    } = req;
    try {
      const toDelete = await usersModel.findOne({ email: user.email });
      if (!toDelete || !toDelete.favorites) {
        return res.status(401).send(errorHandler.userExpMsg);
      }

      const addresses = fav.map((item: any) => item.address);
      const filtered = toDelete.favorites.filter(
        (listing: any) => !addresses.includes(listing.address)
      );
      toDelete.favorites = filtered;
      const updated = await toDelete.save();
      return res.json(updated);

    } catch (error) {
      console.log(error);
      return res.status(500).send(errorHandler.serverExpMsg);
    }
  }
}

const userController = new UserController();
export default userController;
