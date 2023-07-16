import * as bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prismadb";

export const runtime = 'nodejs';
export const preferredRegion = 'bom1';
export const revalidate = 1200;

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");                   
                }

                const hashedPassword = bcrypt.hashSync(credentials.password, 12);

                const isValidPassword = bcrypt.compare(hashedPassword, user.hashedPassword);

                if(!isValidPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }            
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};