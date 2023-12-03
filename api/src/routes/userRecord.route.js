import express from "express";
import { recordResponses } from "../controllers/userRecord.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:testName/submit-test", authenticateUser, recordResponses);

export default router;
