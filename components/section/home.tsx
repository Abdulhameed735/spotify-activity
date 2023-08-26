"use client";
import { useSession, signOut } from "next-auth/react";
import { Session, User } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const HomePage = () => {
	const { data: session } = useSession();
	const [userProfile, setUserProfile] = useState();

	useEffect(() => {
		async function ProfileData() {
			if (session && session.accessToken) {
				try {
					const response = await axios.get("/api/profile", {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserProfile(response.data);
					console.log(response.data);
				} catch (error) {
					console.error("Error fetching profile data:", error);
				}
			}
		}
		ProfileData();
	}, [session]);

	if (!session) {
		return <p>Loading...</p>;
	}

	const { user } = session;

	return (
		<div className="">
			<h1>Welcome, {user?.name}!</h1>
			<Avatar>
				<AvatarImage src={user?.image as string}></AvatarImage>
			</Avatar>

			<Button className="rounded-lg bg-[#1db954] hover:bg-[#1ed655be]" onClick={() => signOut()}>
				Sign out
			</Button>
		</div>
	);
};

export default HomePage;
