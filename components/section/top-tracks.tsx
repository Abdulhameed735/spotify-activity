import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserTopTracksResponse } from "@/types";
import TrackListItem from "../ui/tracklist-item";

const TopTracks = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userToptracks, setUserToptracks] = useState<UserTopTracksResponse | null>(null);

	useEffect(() => {
		async function fetchTopTracks(topItem: string) {
			if (status === "authenticated" && session) {
				try {
					const limit = 10;
					const response = await axios.get(`/api/top-items?top_item=${topItem}&limit=${limit}`, {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserToptracks(response.data.data);
				} catch (error) {
					console.error("Error fetching profile data:", error);
				}
			}
		}
		fetchTopTracks("tracks");
	}, [status, session]);

	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex items-center justify-between">
				<h3>Top Tracks of All Time</h3>
				<Link href="/tracks">
					<Button className="rounded-full border bg-transparent hover:border-[#1ed655be] hover:bg-[#1ed655be]">
						See more
					</Button>
				</Link>
			</div>

			<div>
				<ul className="flex flex-col gap-y-4">
					{userToptracks?.items.map((track) => (
						<li key={track.id}>
							<TrackListItem track={track} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TopTracks;
