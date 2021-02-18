import pkg from "express";
import { composeUsers } from "./user.serialize.js";
import { usersService } from "./user.service.js";
import { authorize } from "../helpers/authorize.js";
import { asyncWrapper } from "../helpers/async.wrapper.js";

const { Router } = pkg;

const router = Router();

router.get(
  "/current",
  authorize,
  asyncWrapper(async (req, res) => {
    const user = await usersService.getUser(req.userId);
    res.send(composeUsers(user));
  })
);

export const userRouter = router;
