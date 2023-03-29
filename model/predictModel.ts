import mongoose from "mongoose";

interface iUser {
  teamA: string;
  teamB: string;

  teamAScore: number;
  teamBScore: number;

  dateTime: string;
  amount: number;
  prize: number;

  scoreEntry: string;
  user: {};
}

interface iUserData extends iUser, mongoose.Document {}

const predictModel = new mongoose.Schema(
  {
    teamA: {
      type: String,
    },
    teamB: {
      type: String,
    },

    teamAScore: {
      type: Number,
    },

    amount: {
      type: Number,
    },

    prize: {
      type: Number,
    },

    teamBScore: {
      type: Number,
    },

    dateTime: {
      type: String,
    },

    scoreEntry: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("predicts", predictModel);
