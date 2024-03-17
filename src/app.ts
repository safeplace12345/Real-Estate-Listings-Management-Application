import serverless from "serverless-http"
import express, { Request, Response, NextFunction } from "express";
import * as listingsRouter from "./routes/listings";
import * as usersRouter from "./routes/users";
import { seedDb } from "./utils/seed";
import bodyParser from "body-parser";
import { authenticate } from "./middleware/auth";
import cors from "cors"

const app = express();
// Register MiddleWare
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register MiddleWare


app.get("/", authenticate, (req: Request, res: Response) => {
  return res.send("Hello World from app.ts!");
});

app.get("/seedDb", async (_, res: Response) => {
  return await seedDb().then((data) => res.send(data));
});

app.use("/listings", authenticate, listingsRouter.default);
app.use("/users", usersRouter.default);

app.use(async (err: Error, _: Request, __: Response, next: NextFunction) => {
  if (!err) {
    //Track Errors from http
    // next(err);
    console.log(err);
    return;
  }
  // await errorHandler.handleError(err);
  return;
});

export const handler = serverless(app)
