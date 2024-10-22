import connectDB from "../../../utils/database";
import ExternalInvestigator from "../../../models/externalInvestigatorModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { email, token } = req.body;

    try {
      const investigator = await ExternalInvestigator.findOne({
        email,
        accessToken: token,
      });
      if (investigator) {
        toast.success("Login successful");
        res.status(200).json({ valid: true, message: "Login successful" });
      } else {
        toast.error("Invalid email or token");
        res
          .status(401)
          .json({ valid: false, message: "Invalid email or token" });
      }
    } catch (error) {
      toast.error(error.message);
      res.status(500).json({ valid: false, error: error.message });
    }
  } else {
    toast.error("Method not allowed");
    res.status(405).json({ message: "Method not allowed" });
  }
}
