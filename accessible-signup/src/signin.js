// pages/api/signin.js
import clientPromise from "../utils/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const client = await clientPromise;
      const db = client.db();

      // Find the user by email
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Successfully signed in
      res.json({ message: "Sign in successful", userName: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
