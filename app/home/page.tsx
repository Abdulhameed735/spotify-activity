"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const Home = () => {
	const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
	const [profileImageUrl, setProfileImageUrl] = useState<string>("");

	const handleFetchProfileImage = async () => {
		try {
			const accessToken = await getAccessTokenSilently();

			console.log(accessToken);
		} catch (error) {
			console.error("Error fetching accessToken:", error);
		}
	};

	useEffect(() => {
		handleFetchProfileImage();
	}, []);

	return (
		isAuthenticated && (
			<div>
				<h2>{user?.name}</h2>
				<p>{user?.email}</p>
				<Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
					Signout
				</Button>
			</div>
		)
	);
};

export default Home;
