import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;

  if (!/^\d{6}$/.test(code) || code.endsWith("7")) {
    return res
      .status(400)
      .json({ success: false, message: "Verification Error" });
  }
  return res.json({ success: true });
});

export default router;
