import express from "express"
import { login, logout, signup } from "../controllers/userController.mjs"
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;