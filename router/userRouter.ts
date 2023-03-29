import express from "express"
import {
  getUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  createOneUser,
  signinUser,
} from "../controller/userController";

const router = express.Router()

router.route("/").get(getUser)
router.route("/:id").get(getOneUser)
router.route("/:id").patch(updateOneUser)
router.route("/:id").delete(deleteOneUser)
router.route("/create").post(createOneUser)
router.route("/signin").post(signinUser)




export default router