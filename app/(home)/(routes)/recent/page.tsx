"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";

interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: {
		reason: string;
	};
	type: string;
	uri: string;
	artists: Artist[];
}

interface Artist {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: any;
	restrictions: {
		reason: string;
	};
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

interface Context {
	type: string;
	href: string;
	external_urls: {
		spotify: string;
	};
	uri: string;
}

interface PlayedItem {
	track: Track;
	played_at: string;
	context: Context;
}

interface UserRecentlyPlayedResponse {
	href: string;
	limit: number;
	next: string | null;
	cursors: {
		after: string;
		before: string;
	};
	total: number;
	items: PlayedItem[];
}

const convertMillisecondsToTime = (milliseconds: number) => {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const RecentPage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userRecentlyPlayed, setUserRecentlyPlayed] = useState<UserRecentlyPlayedResponse | null>(
		null
	);

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
			}
		}
	};

	useEffect(() => {
		fetchRecentlyPlayed();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
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
													<Link className="truncate hover:underline" href={`/artists/${artist.id}`}>
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
		</div>
	);
};

export default RecentPage;
