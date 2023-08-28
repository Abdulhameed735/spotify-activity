import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

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

	useEffect(() => {
		async function fetchTopArtists() {
			if (status === "authenticated" && session) {
				try {
					const limit = 10;
					const response = await axios.get(`/api/artists?limit=${limit}`, {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserTopartists(response.data.data);
					// console.log(response.data.data);
				} catch (error) {
					console.error("Error fetching profile data:", error);
				}
			}
		}
		fetchTopArtists();
	}, [status, session]);

	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex items-center justify-between">
				<h3>Top Artists of All Time</h3>
				<Link href="/artists">
					<Button className="rounded-full border bg-transparent hover:border-[#1ed655be] hover:bg-[#1ed655be]">
						See more
					</Button>
				</Link>
			</div>

			<div>
				<ul className="flex flex-col gap-y-4">
					{userTopartists?.items.map((item) => (
						<li key={item.id} className="flex items-center">
							<Link href={`/artists/${item.id}`} passHref>
								<div className="flex items-center gap-3">
									<div>
										<Image
											src={item.images[0].url}
											alt={item.name}
											width={50}
											height={50}
											className="rounded-full"
										/>
									</div>
									<div>
										<p className="font-semibold hover:underline">{item.name}</p>
										<p className="text-sm text-gray-500">Popularity: {item.popularity}</p>
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

export default TopArtists;
