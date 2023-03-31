import express from "express";
import {
  createPrediction,
  viewAllPredictions,
  allPredictions,
  predictionTable,
  triggerPredictionReward,
  predictionTableForAdmin,

} from "../controller/predictController";

const router = express.Router();
// user viewing their predictions histroy
router.route("/:id/view-user-predictions").get(viewAllPredictions);

// user creating prediction
router.route("/:id/:ID/create-prediction").post(createPrediction);

// showing all predictions history
router.route("/prediction").get(allPredictions);

// showing prediction winner table
router.route("/leader-table").get(predictionTable);

// Admin viewing all winners
router.route("/:id/admin-leader-table").get(predictionTableForAdmin);


// button for admin to trigger sending message and delete entry from the show schema
router.route("/:id/trigger-message").get(triggerPredictionReward);

export default router;
