import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { authCheck } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();  // this funcgion create the new router object //setting up the routes

router.post("/signup", signup)   // controller has all these arrow function
router.post("/login", login)
router.post("/logout", logout)
router.get("/authCheck",protectRoute, authCheck)

export default router;

//NVJYaeIoFd65RjVY