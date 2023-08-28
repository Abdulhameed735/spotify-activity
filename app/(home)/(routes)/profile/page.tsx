"use client";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopArtists from "@/components/section/top-artists";
import TopTracks from "@/components/section/top-tracks";

interface UserProfile {
	display_name: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: UserProfileImage[];
	type: string;
	uri: string;
	followers: {
		href: null | string;
		total: number;
	};
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
}

interface UserProfileImage {
	url: string;
	height: number;
	width: number;
}

const ProfilePage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

	useEffect(() => {
		async function ProfileData() {
			if (status === "authenticated" && session) {
				try {
					const response = await axios.get("/api/profile", {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserProfile(response.data.data);
					// console.log(response.data.data);
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
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<header className="flex flex-col items-center gap-4">
				{userProfile && userProfile.images && (
					<div className="h-32 w-32 overflow-hidden rounded-full lg:h-48 lg:w-48">
						<Image
							src={userProfile.images[1].url}
							alt="User Profile Image"
							width={200}
							height={200}
						/>
					</div>
				)}
				{userProfile && (
					<div className="flex flex-col gap-5">
						<a className="text-center" target="_blank" href={userProfile.external_urls.spotify}>
							<h2 className="text-center text-4xl font-bold hover:text-[#1ed655be] lg:text-5xl">
								{userProfile.display_name}
							</h2>
						</a>

						<div className="flex items-center gap-4">
							<div className="flex flex-col items-center space-y-2">
								<div className="text-xl font-bold">{userProfile.followers.total}</div>
								<p className="text-base uppercase leading-relaxed text-[#1db954]">Followers</p>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="text-xl font-bold">{userProfile.followers.total}</div>
								<p className="text-base uppercase leading-relaxed text-[#1db954]">Following</p>
							</div>
							<Link href="/playlist" className="flex flex-col items-center space-y-2">
								<div className="text-xl font-bold">19</div>
								<p className="text-base uppercase leading-relaxed text-[#1db954]">Playlists</p>
							</Link>
						</div>

						<Button
							className="rounded-full border bg-transparent hover:border-[#1ed655be] hover:bg-[#1ed655be]"
							onClick={() => signOut()}
						>
							Signout
						</Button>
					</div>
				)}
			</header>

			<section className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
				<TopArtists />
				<TopTracks />
			</section>
		</div>
	);
};

export default ProfilePage;
