import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "@/lib/axios";
import { resolveDummyLogin } from "@/lib/auth";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username / Email / ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const identifier = (credentials?.identifier ?? "").toString();
          const passwordInput = (credentials?.password ?? "").toString();

          const { username, password } = await resolveDummyLogin(identifier, passwordInput);

          const { data } = await api.post("/auth/login", {
            username,
            password,
            expiresInMins: 60,
          });

          if (!data?.token) return null;

          return {
            id: String(data.id),
            name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() || data.username,
            email: data.email,
            image: data.image,
            token: data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.token) token.accessToken = user.token;
      if (user?.id) token.id = user.id;
      if (user?.name) token.name = user.name;
      if (user?.email) token.email = user.email;
      if (user?.image) token.picture = user.image;
      return token;
    },
    async session({ session, token }: any) {
      (session as any).accessToken = token.accessToken;
      session.user = {
        ...(session.user || {}),
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
      } as any;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };