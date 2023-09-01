"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { TracksData } from "@/types";
import { Button } from "@/components/ui/button";

const TracksPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [tracksData, setTracksData] = useState<TracksData | null>(null);

	const fetchTracksData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/tracks-data?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setTracksData(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		}
	};

	useEffect(() => {
		fetchTracksData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{tracksData?.tracksInfo && (
				<div className="flex gap-x-4">
					<Link href={tracksData.tracksInfo.external_urls.spotify}>
						<picture>
							<img
								className="h-[150px] w-[150px] object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
								src={tracksData.tracksInfo.album.images[0].url}
								alt={tracksData.tracksInfo.album.name}
							/>
						</picture>
					</Link>
					<div className="flex-1 flex-col gap-y-4 text-lg font-semibold">
						<h2 className="text-3xl">{tracksData.tracksInfo.album.name}</h2>
						<h2 className="text-xl">
							{tracksData.tracksInfo.artists.map((artist) => (
								<span key={artist.id}>{artist.name}</span>
							))}
						</h2>
						<div className="gap-1 text-sm text-slate-300">
							<span>{tracksData.tracksInfo.album.name}</span>·
							<span className="hover:underline">
								{new Date(tracksData.tracksInfo.album.release_date).getFullYear()}
							</span>
						</div>
						<Link href={tracksData.tracksInfo.external_urls.spotify}>
							<Button className="lg:w-[150px]rounded-full w-full bg-green-600 hover:bg-green-700">
								Play
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default TracksPage;
