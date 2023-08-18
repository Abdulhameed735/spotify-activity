"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const Home = () => {
	const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
	const [profileImageUrl, setProfileImageUrl] = useState<string>("");

	// const handleFetchProfileImage = async () => {
	// 	try {
	// 		const accessToken = await getAccessTokenSilently();

	// 		const response = await fetch(`/api/profile?access_token=${accessToken}`);
	// 		const data = await response.json();

	// 		setProfileImageUrl(data.profileImageUrl);
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.error("Error fetching profile image:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	handleFetchProfileImage();
	// }, []);

	return (
		isAuthenticated && (
			<div>
				{/* {profileImageUrl && (
					<Image src={profileImageUrl} width={500} height={500} alt="user image" />
				)} */}
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
