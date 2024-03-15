import app from "./app";
import compression from "compression";
import helmet from "helmet";
import DbService from "./lib/db";

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

const server = app.listen(4000, () => {
  const db = new DbService()
    if (db) {
      return console.log("Starting ExpressJS server on Port 4000");
    }
    console.log("DB failure: Starting ExpressJS server on Port 3000");
});

export default server;
