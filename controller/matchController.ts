import { Request, Response } from "express";
import matchModel from "../model/matchModel";
import userModel from "../model/userModel";
import predictModel from "../model/predictModel";
import { congratulation } from "../utils/email";

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { teamA, teamB, teamAScore, teamBScore, Odds, dateTime } = req.body;
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (user?.isAdmin) {
      const match = await matchModel.create({
        teamA,
        teamB,
        teamAScore: 0,
        teamBScore: 0,
        Odds,
        stopPlay: false,
        startPlay: false,
        scoreEntry: `${0} v ${0}`,
        dateTime,
      });

      return res.status(201).json({
        message: "match created",
        data: match,
      });
    } else {
      return res.status(404).json({
        message: "You can't do this",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const viewAllMatch = async (req: Request, res: Response) => {
  try {
    const match = await matchModel.find();
    const predict = await predictModel.find();

    return res.status(200).json({
      message: "found",
      data: match,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateScoreMatch = async (req: Request, res: Response) => {
  try {
    const { ID, id } = req.params;
    const { teamAScore, teamBScore } = req.body;
    const user = await userModel.findById(id);
    const match = await matchModel.findById(ID);

    if (user?.isAdmin) {
      if (match && match.startPlay) {
        if (match?.stopPlay) {
          return res.json({
            message: "Match has ended",
          });
        } else {
          const match = await matchModel.findByIdAndUpdate(
            ID,
            {
              teamAScore,
              teamBScore,
              scoreEntry: `${teamAScore} v ${teamBScore}`,
            },
            { new: true },
          );

          return res.status(200).json({
            message: "found",
            data: match,
          });
        }
      } else {
        return res.status(404).json({
          message: "fill it up",
        });
      }
    } else {
      return res.status(404).json({
        message: "error in user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateStartMatch = async (req: Request, res: Response) => {
  try {
    const { ID, id } = req.params;

    const user = await userModel.findById(id);
    const { teamAScore, teamBScore, startPlay } = req.body;

    if (user?.isAdmin) {
      const match = await matchModel.findByIdAndUpdate(
        ID,
        {
          startPlay: true,
        },
        { new: true },
      );

      setTimeout(async () => {
        await matchModel.findByIdAndUpdate(
          ID,
          {
            stopPlay: true,
          },
          { new: true },
        );

        const predict = await predictModel.find();
        const match = await matchModel.find();

        const table = predict.filter((el) => {
          return match.some((props) => el.scoreEntry === props.scoreEntry);
        });

        table.map((el) => {
          let email = el?.email;
          let prize = el?.prize;

          congratulation(email, prize)
            .then((result) => {
              console.log("message been sent to you: ");
            })
            .catch((error) => console.log(error));
        });
      }, 10000);

      return res.status(200).json({
        message: "found",
        data: match,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
