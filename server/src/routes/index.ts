import { Router } from "express";

const router = Router();

// @path /api/checkhealth
router.get("/checkhealth", (_, res) => {
  res.sendStatus(200);
});

export default router;
