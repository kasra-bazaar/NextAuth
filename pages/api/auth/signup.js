import ConnectToTheMongoDb from "../../../lib/auth";
import { Passwords } from "../../../lib/passwords";

export default async function handler(req, res) {
  const data = req.body;
  const { email, password } = data;
 
  if (req.method === "POST") {
    if (
      !email ||
      !password ||
      !email.includes("@") ||
      password.trim().length <= 7
    ) {
      res.status(422).json({ message: "invalid Value" });
      return;
    }
    const client = await ConnectToTheMongoDb();

    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "user is already exist" });
      return;
    }
    const hashedPassword = await Passwords(password);

    const newData = {
      email: email,
      password: hashedPassword,
    };
    db.collection("users").insertOne(newData);
    res.status(201).json({ message: "auth was succesfully" });
  }
}
