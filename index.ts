import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { db } from "./utils/database";

const port: number = 3366;
const app: Application = express();

mainApp(app);

const server = app.listen(port, () => {
  console.log("");
  console.log("server is up");
  console.log("");

  db();
});

process.on("uncaughtException", (err: Error) => {
  console.log("shutting down server: uncaughtException");
  console.log(err);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("shutting down server: unhandledRejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
