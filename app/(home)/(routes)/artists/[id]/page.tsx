"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { ArtistData } from "@/types";

const ArtistPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [artistsData, setArtistsData] = useState<ArtistData | null>(null);

	const fetchArtistsData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/artists-data?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setArtistsData(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		}
	};

	useEffect(() => {
		fetchArtistsData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{artistsData?.artistInfo && (
				<div className="flex flex-col items-center justify-center text-center">
					<Link href={artistsData.artistInfo.external_urls.spotify}>
						<picture>
							<img
								className="h-[150px] w-[150px] rounded-full object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
								src={artistsData.artistInfo.images[0].url}
								alt={artistsData.artistInfo.name}
							/>
						</picture>
					</Link>
					<div className="mt-6 flex flex-col items-center justify-center gap-y-5">
						<h1 className="text-2xl font-semibold">{artistsData.artistInfo.name}</h1>
						<div className="flex w-full items-center justify-between">
							<div className="flex flex-col items-center gap-y-1">
								<h3 className="text-xl font-bold text-green-400">
									{artistsData.artistInfo.followers.total.toLocaleString()}
								</h3>
								<p className="text-sm uppercase text-slate-400">Followers</p>
							</div>

							<div className="flex flex-col items-center gap-y-1">
								<h3 className="text-xl font-bold text-green-400">
									{artistsData.artistInfo.popularity}%
								</h3>
								<p className="text-sm uppercase text-slate-400">Popularity</p>
							</div>
						</div>
						<div className="">
							<p className="text-sm font-semibold uppercase text-green-400">Genres</p>
							<div className="mt-1 flex capitalize">
								{artistsData.artistInfo.genres.map((genre) => (
									<h6 key={genre} className="ml-2 text-xs">
										{genre}
									</h6>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ArtistPage;
