"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
	const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string;

	const redirectUri =
		process.env.NODE_ENV === "development"
			? process.env.NEXT_PUBLIC_DEV_REDIRECT
			: process.env.NEXT_PUBLIC_PROD_REDIRECT;

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: `${redirectUri as string}/home`,
				scope:
					"openid profile email user-read-private user-read-email playlist-read-private playlist-modify-public"
			}}
		>
			{children}
		</Auth0Provider>
	);
};

export default AuthProvider;
