"use client";
import { useSession, signOut } from "next-auth/react";
import { Session, User } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Sidebar from "@/components/section/sidebar";

const HomePage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userProfile, setUserProfile] = useState();

	useEffect(() => {
		async function ProfileData() {
			if (status === "authenticated" && session) {
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
	}, [status, session]);

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<main className="relative flex min-h-screen w-full flex-col bg-slate-950 text-white lg:flex-row">
			<Sidebar />
			<section className="">
				<h1>Hey</h1>
			</section>
		</main>
	);
};

export default HomePage;
