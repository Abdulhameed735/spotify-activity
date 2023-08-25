import spotifyAPi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth, { TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token: TokenSet) {
	try {
		spotifyAPi.setAccessToken(token.accessToken as string);
		spotifyAPi.setRefreshToken(token.refreshToken as string);

		const { body: refreshedToken } = await spotifyAPi.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken
		};
	} catch (error) {
		return {
			...token,
			error: "Refresh access token error"
		};
	}
}

const handler = NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			authorization: LOGIN_URL
		})
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at ? account.expires_at * 1000 : undefined
				};
			}

			if (Date.now() < (token.accessTokenExpires as number)) {
				return token;
			}

			return await refreshAccessToken(token);
		},

		async session({ session, token, user }: { session: any; token: JWT; user: any }) {
			session.user.accessToken = token.accessToken as string;
			session.user.refreshToken = token.refreshToken as string;
			session.user.username = token.username as string;

			return session;
		}
	}
});

export { handler as GET, handler as POST };
