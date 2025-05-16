import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { encode } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      isAdmin: boolean,
      addressId: string,
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db,{usersTable: users, accountsTable: accounts, sessionsTable: sessions, verificationTokensTable: verificationTokens}),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        console.log("credentials", credentials);
  
        if (!credentials?.email || !credentials?.password || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user || !user.passwordHash) return null;

        if (!bcrypt.compareSync(credentials.password, user.passwordHash)) return null; 
        console.log("****Login Succesfull****", user);
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", 
  },
  jwt: {
		encode: async ({ token, maxAge, salt, secret }) => {
			const encoded = await encode({ token, maxAge, salt, secret });
			//console.log("**** JWT ENCODE ****");
			//console.log(token, maxAge, salt, secret, encoded);

        try {
          await db.insert(sessions).values({
            sessionToken: encoded,
            userId: token!.sub!,
            expires: new Date(Date.now() + maxAge! * 1000),
        });
			} catch (err) {
				console.error('Error saving session token', err);
			}

			return encoded;
		},
	},
  session: {
    maxAge: 10 * 60, // 10 minutes
    updateAge: 4 * 60, // 4 minutes
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      const existingUser = user as any as typeof users.$inferSelect;
      session.user.name = existingUser.firstName + " " + existingUser.lastName;
      session.user.email = user.email;
      session.user.isAdmin = existingUser.isAdmin ?? false;
      session.user.addressId = existingUser.addressId!;
      return session;
    },
  },
});