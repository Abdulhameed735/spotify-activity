"use client";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import TopArtists from "@/components/section/top-artists";
import TopTracks from "@/components/section/top-tracks";
import { Profile } from "@/types";

const ProfilePage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userProfile, setUserProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
				} catch (error) {
					console.error("Error fetching profile data:", error);
				} finally {
					setIsLoading(false);
				}
			}
		}
		ProfileData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="justidy-center flex items-center">
					<p>Loading...</p>
				</div>
			) : (
				<>
					<header className="flex flex-col items-center gap-4">
						{userProfile && userProfile.profile.images && (
							<div>
								<picture>
									<img
										src={userProfile.profile.images[1].url}
										alt="User Profile Image"
										className="h-[130px] w-[130px] rounded-full object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
									/>
								</picture>
							</div>
						)}
						{userProfile && (
							<div className="flex flex-col gap-5">
								<a
									className="text-center"
									target="_blank"
									href={userProfile.profile.external_urls.spotify}
								>
									<h2 className="text-center text-4xl font-bold hover:text-[#1ed655be] lg:text-5xl">
										{userProfile.profile.display_name}
									</h2>
								</a>

								<div className="flex items-center gap-4">
									<div className="flex flex-col items-center space-y-2">
										<div className="text-xl font-bold">{userProfile.profile.followers.total}</div>
										<p className="text-base uppercase leading-relaxed text-[#1db954]">Followers</p>
									</div>
									<div className="flex flex-col items-center space-y-2">
										<div className="text-xl font-bold">{userProfile.profile.followers.total}</div>
										<p className="text-base uppercase leading-relaxed text-[#1db954]">Following</p>
									</div>
									<Link href="/playlist" className="flex flex-col items-center space-y-2">
										<div className="text-xl font-bold">{userProfile.playlist.total}</div>
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
				</>
			)}
		</div>
	);
};

export default ProfilePage;
