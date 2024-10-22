import connectDB from "../../../utils/database";
import ExternalInvestigator from "../../../models/externalInvestigatorModel";

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
        res.status(200).json({ valid: true, message: "Login successful" });
      } else {
        res
          .status(401)
          .json({ valid: false, message: "Invalid email or token" });
      }
    } catch (error) {
      res.status(500).json({ valid: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
