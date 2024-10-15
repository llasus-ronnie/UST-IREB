import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, token } = req.body;

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (decoded.email === email) {
        res.status(200).json({ valid: true });
      } else {
        res
          .status(401)
          .json({ valid: false, message: "Invalid email or token" });
      }
    } catch (error) {
      res.status(401).json({ valid: false, message: "Invalid token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
