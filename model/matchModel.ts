import mongoose from "mongoose";

interface iUser {
  startPlay: boolean;
  stopPlay: boolean;

  teamA: string;
  teamB: string;

  teamBOdds: number;
  Odds: number;

  teamAScore: number;
  teamBScore: number;

  dateTime: string;

  scoreEntry: string;

  predict: any[];
}

interface iUserData extends iUser, mongoose.Document {}

const matchModel = new mongoose.Schema(
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

    teamAScore: {
      type: Number,
    },

    teamBScore: {
      type: Number,
    },

    Odds: {
      type: Number,
    },

   

    dateTime: {
      type: String,
    },

    scoreEntry: {
      type: String,
    },

    predict: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "predicts",
    }],
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("matches", matchModel);
