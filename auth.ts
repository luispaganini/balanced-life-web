import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import UserRoleEnum from "./enums/UserRoleEnum";
import { login, loginVerifyCPF } from "./services/login/login";
import ISessionAuthInterface from "./interfaces/Login/ISessionAuthInterface";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    pages: {
        signIn: '/auth/signin',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                cpf: { label: 'CPF', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.cpf || !credentials?.password)
                    return null;

                try {
                    const auth = await login(credentials.cpf as string, credentials.password as string);

                    if (auth) {
                        const user = await loginVerifyCPF(credentials.cpf as string);

                        if (user && user.userRole?.id === UserRoleEnum.Nutricionist) {
                            return {
                                id: user.id?.toString(),
                                name: user.name,
                                email: user.email,
                                accessToken: auth.accessToken,
                                refreshToken: auth.refreshToken
                            };
                        }
                    }

                    return null;
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            if (!!auth)
                return true;

            return !!auth
        },
        jwt: async ({token, user}) => {
            return {...token, ...user}
        },
        session: async ({session, token, user}) => {
            session.user = token as any;
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    }
});