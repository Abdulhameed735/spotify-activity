"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { UserRecentlyPlayedResponse } from "@/types";
import { convertMillisecondsToTime } from "@/utils/convert-time";

const RecentPage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userRecentlyPlayed, setUserRecentlyPlayed] = useState<UserRecentlyPlayedResponse | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	const fetchRecentlyPlayed = async () => {
		if (status === "authenticated" && session) {
			try {
				const limit = 30;
				const response = await axios.get(`/api/recent?limit=${limit}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setUserRecentlyPlayed(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchRecentlyPlayed();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="justify-senter flex items-center">
					<p>Loading...</p>
				</div>
			) : (
				<>
					{" "}
					<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
						<h2 className="text-center text-xl font-bold lg:text-2xl">Recently Played Tracks</h2>
					</header>
					<section>
						<ul className="flex flex-col gap-y-4">
							{userRecentlyPlayed?.items.map((recent) => (
								<li key={recent.track?.id}>
									<Link className="flex gap-3" href={`/tracks/${recent.track?.id}`}>
										<div>
											<Image
												src={recent.track?.album.images[0].url}
												width={50}
												height={50}
												alt={recent.track?.name}
											/>
										</div>
										<div className="flex w-full items-center justify-between">
											<div className="flex flex-col gap-y-1">
												<span className="hover:underline">{recent.track?.name}</span>
												<div className="flex gap-1 text-sm text-slate-300">
													{recent.track?.artists.map((artist, index) => (
														<React.Fragment key={artist.id}>
															{index > 0 && ","}
															<Link
																className="truncate hover:underline"
																href={`/artists/${artist.id}`}
															>
																{artist.name}
															</Link>
														</React.Fragment>
													))}
													·<span className="hover:underline">{recent.track?.album.name}</span>
												</div>
											</div>
											<span className="text-base">
												{convertMillisecondsToTime(recent.track?.duration_ms)}
											</span>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</>
			)}
		</div>
	);
};

export default RecentPage;
