"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
	const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string;
	const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{ redirect_uri: `${appBaseUrl}/home` }}
		>
			{children}
		</Auth0Provider>
	);
};

export default AuthProvider;
