import express, { Response, Request } from "express";
import { body } from "express-validator";
import { getToken } from "../services/token";
import config from "../configs/twilio";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/video/token",
  [
    body("identity")
      .isString()
      .notEmpty()
      .withMessage("Identity must be valid"),
    body("room").isString().notEmpty().withMessage("Room name must be valid"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { identity, room } = req.body;

    const token = getToken(identity, room, config);
    res.status(200).send({ token: token.toJwt() });
  }
);

export { router as tokenRouter };
