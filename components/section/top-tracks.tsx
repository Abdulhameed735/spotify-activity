import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TracksResponse {
	album: {
		album_type: string;
		artists: {
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			name: string;
			type: string;
			uri: string;
		}[];
		available_markets: string[];
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		images: {
			height: number;
			url: string;
			width: number;
		}[];
		name: string;
		release_date: string;
		release_date_precision: string;
		total_tracks: number;
		type: string;
		uri: string;
	};
	artists: {
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		name: string;
		type: string;
		uri: string;
	}[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

interface UserTopTracksResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: TracksResponse[];
}

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
					// console.log(response.data.data);
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
							<Link className="flex gap-3" href={`/tracks/${track.id}`}>
								<div>
									<Image src={track.album.images[0].url} width={50} height={50} alt={track.name} />
								</div>
								<div className="flex">
									<div className="flex flex-col gap-y-1">
										<span className="hover:underline">{track.name}</span>
										<div className="flex gap-1 text-sm text-slate-300">
											{track.artists.map((artist, index) => (
												<React.Fragment key={artist.id}>
													{index > 0 && ","}
													<Link className="truncate hover:underline" href={`/artists/${artist.id}`}>
														{artist.name}
													</Link>
												</React.Fragment>
											))}
											·<span className="hover:underline">{track.album.name}</span>
										</div>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TopTracks;
