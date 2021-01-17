import { Router } from "express";

import * as loginAuth from "../controllers/auth.login.controller";

export const router = Router();

// router.get("/", loginAuth.get);
router.post("/", loginAuth.post);
// router.put("/", loginAuth.update);
// router.delete("/", loginAuth.remove);
