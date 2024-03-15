import express, { Response, Request } from "express";
import { usersModel } from "../lib/schemas/user";
import { errorHandler } from "../utils/errorHandler";

import { authenticate } from "../middleware/auth";
import userController from "src/utils/userController";

const router = express.Router();

router.get("/all", authenticate, async (_: Request, res: Response) => {
  try {
    const users = await usersModel.find();
    if (!users) {
      return res.status(401).json({ message: errorHandler.usersExpMsg });
    }

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorHandler.serverExpMsg);
  }
});

router.post("/login", userController.loginUser);

router.post("/create", userController.createUser);

router.get("/:email", authenticate, async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(401).send(errorHandler.userExpMsg);
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorHandler.serverExpMsg);
  }
});

router.put(
  "/favorites",
  authenticate,
  userController.updateFavList
);

router.delete(
  "/favorites",
  authenticate,
  userController.deleteFromFavList
);

export default router;
