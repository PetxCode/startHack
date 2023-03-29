import express from "express";
import {
  createMatch,
  viewAllMatch,
  updateScoreMatch,
  updateStartMatch,
} from "../controller/matchController";

const router = express.Router();

router.route("/view-match").get(viewAllMatch);

router.route("/:id/create-match").post(createMatch);

router.route("/:id/:ID/score-match").patch(updateScoreMatch);

router.route("/:id/:ID/start-match").patch(updateStartMatch);

export default router;
