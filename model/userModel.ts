import mongoose from "mongoose"

interface iUser {
    isAdmin: boolean,
    email: string,
    password: string,
    userName: string,

    predict: any[]
}

interface iUserData extends iUser, mongoose.Document { }


const userModel = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },

    predict: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "predicts",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("users", userModel)