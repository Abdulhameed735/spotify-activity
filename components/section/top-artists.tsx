import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserTopArtistsResponse } from "@/types";

const TopArtists = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userTopartists, setUserTopartists] = useState<UserTopArtistsResponse | null>(null);

	useEffect(() => {
		async function fetchTopArtists(topItem: string) {
			if (status === "authenticated" && session) {
				try {
					const limit = 10;
					const response = await axios.get(`/api/top-items?top_item=${topItem}&limit=${limit}`, {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserTopartists(response.data.data);
				} catch (error) {
					console.error("Error fetching profile data:", error);
				}
			}
		}
		fetchTopArtists("artists");
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
					{userTopartists?.items.map((artist) => (
						<li key={artist.id} className="flex items-center">
							<Link href={`/artists/${artist.id}`} passHref>
								<div className="flex items-center gap-3">
									<div>
										<picture>
											<img
												className="h-[50px] w-[50px] rounded-full object-cover"
												src={artist.images[0].url}
												alt={artist.name}
											/>
										</picture>
									</div>
									<div>
										<p className="font-semibold hover:underline">{artist.name}</p>
										<p className="text-sm text-gray-500">Popularity: {artist.popularity}</p>
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
