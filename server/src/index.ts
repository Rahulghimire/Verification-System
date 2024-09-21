import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.post("/verify", (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;

  if (!/^\d{6}$/.test(code) || code.endsWith("7")) {
    return res
      .status(400)
      .json({ success: false, message: "Verification Error" });
  }
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
