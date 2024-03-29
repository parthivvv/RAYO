// pages/api/signup.js
import clientPromise from "../utils/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const client = await clientPromise;
      const db = client.db();

      // Check if the user already exists
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
