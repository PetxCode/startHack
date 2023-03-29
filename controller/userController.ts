import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    const user = await userModel.findByIdAndUpdate(
      id,
      { userName },
      { new: true },
    );

    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};

export const createOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName, email, password } = req.body;

    const sat = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, sat);
    const user = await userModel.create({
      userName,
      email,
      password: hashed,
    });

    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Error in User",
      });
    } else {
      const checked = await bcrypt.compare(password, user.password);

      if (checked) {
        return res.status(200).json({
          message: "found",
          data: user,
        });
      }
    }
  } catch (err: any) {
    return res.status(404).json({
      message: "Error",
      data: err.message,
    });
  }
};
