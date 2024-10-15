import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
