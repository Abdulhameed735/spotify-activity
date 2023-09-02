"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import TrackListItem from "@/components/ui/tracklist-item";
import { UserTopTracksResponse } from "@/types";

const TopTracks = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userToptracks, setUserToptracks] = useState<UserTopTracksResponse | null>(null);
	const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");
	const [isLoading, setIsLoading] = useState(true);

	const fetchTopArtists = async (topItem: string, timeRange: string) => {
		if (status === "authenticated" && session) {
			try {
				const limit = 30;
				const response = await axios.get(
					`/api/top-items?top_item=${topItem}&limit=${limit}&time_range=${timeRange}`,
					{
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					}
				);
				setUserToptracks(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchTopArtists("tracks", selectedTimeRange);
	}, [selectedTimeRange, status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="justify-center-tems-center flex">
					<p>Loading...</p>
				</div>
			) : (
				<>
					<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
						<h2 className="text-center text-xl font-bold lg:text-2xl">Top Tracks</h2>
						<div className="flex justify-around gap-3">
							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "long_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("tracks", "long_term")}
							>
								<span>All Time</span>
							</button>

							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "medium_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("tracks", "medium_term")}
							>
								<span>Last 6 months</span>
							</button>

							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "short_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("tracks", "short_term")}
							>
								<span>Last 4 weeks</span>
							</button>
						</div>
					</header>

					<section>
						<ul className="flex flex-col gap-y-4">
							{userToptracks?.items.map((track) => (
								<li key={track.id}>
									<TrackListItem track={track} />
								</li>
							))}
						</ul>
					</section>
				</>
			)}
		</div>
	);
};

export default TopTracks;
