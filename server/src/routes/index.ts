import { Router } from "express";

const router = Router();

// @path /api/checkhealth
router.get("/checkhealth", (req, res) => {
  res.sendStatus(200)
});

export default router;
