import ConnectToTheMongoDb from "../../../lib/auth";

import { Passwords, verifyPassword } from "../../../lib/passwords";

import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }
  const email = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const client = await ConnectToTheMongoDb();
  const db = client.db('authapp');
  const userCollections =  db.collection("users");
  const user = await userCollections.findOne({ email: email });

  if (!user) {
    res.status(401).json({ message: "not authenticated" });
    client.close();
    return;
  }

  const userPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, userPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "passwords is not match" });
    client.close();
    return;
  }
  const newUserPassword = await Passwords(newPassword);
  const result = await userCollections.updateOne(
    { email: email },
    { $set: { password: newUserPassword } }
  );
  if (!result) {
    client.close();
    res.status(500).json({ message: "connection failed" });
    return;
  }
  client.close();
  res.status(200).json({ message: "password is updated !" });
}
