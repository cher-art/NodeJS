import pkg from "express";
const { Router } = pkg;
import { validate } from "../helpers/validate.js";
import {
  signUp,
  authService,
  logOut,
  verifyUser,
} from "./userAuth.controller.js";
import Joi from "joi";
import { asyncWrapper } from "../helpers/async.wrapper.js";
import { authorize } from "../helpers/authorize.js";

const router = Router();

const signUpSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", validate(signUpSchema), signUp);

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post(
  "/login",
  validate(signInSchema),
  asyncWrapper(async (req, res) => {
    const { user, token } = await authService.signIn(req.body);

    res.cookie("token", token, { httpOnly: true, signed: true });
    return res.status(201).send({
      user: composeUsers(user),
    });
  })
);

router.post("/logout", authorize, logOut);

router.get("/verify/:verificationToken", verifyUser);

export const authRouter = router;
