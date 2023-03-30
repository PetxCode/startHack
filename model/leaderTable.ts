import mongoose from "mongoose";

interface iUser {
  startPlay: boolean;
  stopPlay: boolean;

  teamA: string;
  teamB: string;

  teamAScore: number;
  teamBScore: number;

  matchID: string;
  dateTime: string;
  email: string;
  amount: number;
  prize: number;

  scoreEntry: string;
  user: {};
}

interface iUserData extends iUser, mongoose.Document {}

const leaderModel = new mongoose.Schema(
  {
    startPlay: {
      type: Boolean,
    },
    stopPlay: {
      type: Boolean,
    },
    teamA: {
      type: String,
    },
    teamB: {
      type: String,
    },
    email: {
      type: String,
    },
    matchID: {
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

export default mongoose.model<iUserData>("leaders", leaderModel);
