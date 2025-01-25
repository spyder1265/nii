import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/dashboard");
  }
}

export async function loginIsRequiredClient() {
  if (typeof window === "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) {
      router.push("/dashboard");
    }
  }
}
