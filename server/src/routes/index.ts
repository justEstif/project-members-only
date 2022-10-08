import { Router } from "express";

const router = Router();
const array: string[] = [];

router.get("/", (req, res) => {
  res.json({ name: "frodo" });
});

router.get("/test", (req, res) => res.json({ array }));

router.post("/test", (req, res) => {
  array.push(req.body.item);
  res.send("success");
});

export default router;
