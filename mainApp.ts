import express, { Application } from "express";
import cors from "cors";
import user from "./router/userRouter"
import match from "./router/matchRoute"
import predict from "./router/predictRouter"

export const mainApp = (app: Application) => {
    app
      .use(express.json())
      .use(cors())

      .use("/api/", user)
      .use("/api/match", match)
      .use("/api/predict", predict);
};
