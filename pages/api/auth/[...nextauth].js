import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectToTheMongoDb from "../../../lib/auth";
import { verifyPassword } from "../../../lib/passwords";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const client = await ConnectToTheMongoDb();
        const userCollections = client.db().collection("users");
        const user = await userCollections.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("not user");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("wrong password");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
