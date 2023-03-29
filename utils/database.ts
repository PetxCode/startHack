import mongoose from "mongoose";

const url: string =
  "mongodb+srv://georgeseo06:georgeseo06@cluster0.klschdl.mongodb.net/newTest?retryWrites=true&w=majority";

export const db = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected base");
    })
    .catch((err) => {
      console.log(err);
    });
};
