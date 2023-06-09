import { Request, Response } from "express";
import matchModel from "../model/matchModel";
import userModel from "../model/userModel";
import predictModel from "../model/predictModel";
import mongoose from "mongoose";
import { congratulation } from "../utils/email";

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const { id, ID } = req.params;
    const { teamAScore, teamBScore, amount } = req.body;
    const user = await userModel.findById(id);
    const match = await matchModel.findById(ID);

    if (user) {
      if (match?.stopPlay) {
        return res.json({
          message: "Match has ended",
        });
      } else {
        const newMatch = await predictModel.create({
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamAScore,
          teamBScore,
          matchID: ID,
          amount,
          email: user.email,
          prize: match?.Odds! * amount,

          scoreEntry: `${teamAScore} v ${teamBScore}`,
        });

        console.log(newMatch);

        user.predict.push(new mongoose.Types.ObjectId(newMatch?._id));
        user.save();
        console.log(newMatch);

        match?.predict.push(new mongoose.Types.ObjectId(newMatch?._id));
        match?.save();
        console.log(newMatch);
        return res.status(201).json({
          message: "Prediction entry successful",
          data: newMatch,
        });
      }
    } else {
      return res.status(404).json({
        message: "User can't be found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
    });
  }
};

export const viewAllPredictions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate({
      path: "predict",
      options: {
        createdAt: -1,
      },
    });

    return res.status(404).json({
      message: "user prediction",
      data: user?.predict,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Erro",
    });
  }
};

export const allPredictions = async (req: Request, res: Response) => {
  try {
    const user = await predictModel.find();

    return res.status(200).json({
      message: "user prediction",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Erro",
    });
  }
};

export const predictionTable = async (req: Request, res: Response) => {
  try {
    const predict = await predictModel.find();
    const match = await matchModel.find();

    const table = predict.filter(async (el) => {
      return match.some((props) => el.scoreEntry === props.scoreEntry);
    });

    return res.status(200).json({
      message: " prediction table",
      data: table,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const predictionTableForAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const predict = await predictModel.find();
    const match = await matchModel.find();
    const user = await userModel.findById(id);

    const table = predict.filter(async (el) => {
      return match.some((props) => el.scoreEntry === props.scoreEntry);
    });

    // const showTable = await leaderModel.find();

    table.map((el) => {
      user!.show.push(el);
    });

    user!.save();
    return res.status(200).json({
      message: "prediction leaderstable",
      data: user?.show,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
    });
  }
};


export const userPredictionTable = async (req: Request, res: Response) => {
  try {
    const { id, ID } = req.params;
    const predict = await userModel.findById(id).populate({
      path: "predict",
    });
    const match = await matchModel.find();

    const table = match.filter((el) => {
      return predict!.predict.some(
        (props) => el.scoreEntry === props.scoreEntry,
      );
    });

    return res.status(200).json({
      message: " prediction table",
      data: table,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Erro",
    });
  }
};

//This function triggers messages in the show[] to be sent
export const triggerPredictionReward = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const predict = await predictModel.find();
    const match = await matchModel.find();

    const user = await userModel.findById(id);

    if (user) {
      user.show.map((el) => {
        let email = el?.email;
        let prize = el?.prize;

        congratulation(email, prize)
          .then((result) => {
            console.log("message been sent to you: ");
          })
          .catch((error) => console.log(error));
      });

      //here dele all data inside the show for fresh entry

      setTimeout(async () => {
        console.log("well done...");
        while (user?.show.length > 0) {
          console.log(user?.show.length);
          user?.show.pop();
        }
        console.log("passed shown: ", user.show);
        user.save();
      }, 5000);

      console.log("passed: ", user.show);

      return res.status(200).json({
        message: "Message sent to Everyone taht wins...!",
        data: user.show,
      });
    } else {
      return res.status(404).json({
        message: "Only admin can do this!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Erro",
    });
  }
};
