"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";

interface ArtistsResponse {
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

interface UserTopArtistsResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: ArtistsResponse[];
}

const TopArtists = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userTopartists, setUserTopartists] = useState<UserTopArtistsResponse | null>(null);
	const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");

	const fetchTopArtists = async (timeRange: string) => {
		if (status === "authenticated" && session) {
			try {
				const limit = 10;
				const response = await axios.get(`/api/artists?limit=${limit}&time_range=${timeRange}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setUserTopartists(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		}
	};

	useEffect(() => {
		fetchTopArtists(selectedTimeRange);
	}, [selectedTimeRange, status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
				<h2 className="text-center text-xl font-bold lg:text-2xl">Top Artists</h2>
				<div className="flex justify-around gap-3">
					<button
						className="bg-transparent p-2 font-semibold"
						onClick={() => fetchTopArtists("long_term")}
					>
						<span>All Time</span>
					</button>

					<button
						className="bg-transparent p-2 font-semibold"
						onClick={() => fetchTopArtists("medium_term")}
					>
						<span>Last 6 months</span>
					</button>

					<button
						className="bg-transparent p-2 font-semibold"
						onClick={() => fetchTopArtists("short_term")}
					>
						<span>Last 4 weeks</span>
					</button>
				</div>
			</header>

			<section className="md:lg-grid-cols-3 grid w-full grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-5">
				{userTopartists?.items.map((artist) => (
					<div key={artist.id} className="flex flex-col items-center gap-y-4 text-center">
						<div className="h-[200px] w-[200px] overflow-hidden rounded-full">
							<Image
								src={artist.images[0].url}
								alt={artist.name}
								width={200}
								height={200}
								objectFit="cover"
							/>
						</div>

						<Link href={`/artists/${artist.id}`} className="font-semibold hover:underline">
							{artist.name}
						</Link>
					</div>
				))}
			</section>
		</div>
	);
};

export default TopArtists;
