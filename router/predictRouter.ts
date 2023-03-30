import express from "express";
import {
  createPrediction,
  viewAllPredictions,
  allPredictions,
  predictionTable,
  triggerPredictionReward
} from "../controller/predictController";

const router = express.Router();

router.route("/:id/view-user-predictions").get(viewAllPredictions);

router.route("/:id/:ID/create-prediction").post(createPrediction);

router.route("/prediction").get(allPredictions);

router.route("/leader-table").get(predictionTable);
router.route("/:id/trigger-message").get(triggerPredictionReward);

export default router;
