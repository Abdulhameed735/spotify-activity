"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { PlaylistData } from "@/types";
import TrackListItem from "@/components/ui/tracklist-item";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchPlaylistData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/playlist?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setPlaylistData(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchPlaylistData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="flex items-center justify-center">
					<p>Loading...</p>
				</div>
			) : (
				<>
					{playlistData && (
						<div className="flex flex-col lg:flex-row">
							<div className="w-full min-w-[auto] text-center lg:w-[30%] lg:min-w-[200px] ">
								<div className=" max-w-[250px] lg:mr-10">
									<picture>
										<img
											className="h-[150px] w-[150px] rounded object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
											src={playlistData.images[0].url}
											alt={playlistData.name}
										/>
									</picture>
								</div>

								<Link href={playlistData.external_urls.spotify}>
									<h3 className="mt-3 text-xl font-semibold lg:text-2xl  ">{playlistData.name}</h3>
								</Link>
								<p className="text-sm text-slate-600">{playlistData.owner.display_name}</p>
								<p className="mt-1 text-sm">{playlistData.tracks.total}</p>
							</div>

							<div className="my-5 flex-1 lg:my-0 lg:ml-10">
								<ul className="flex flex-col gap-y-4">
									{playlistData.tracks.items.map((track) => (
										<li key={track.track.id}>
											<TrackListItem track={track.track} />
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default PlaylistPage;
