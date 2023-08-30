"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { LockIcon, UnlockIcon, DotIcon } from "lucide-react";
import { UserPlaylistResponse } from "@/types/playlist";

const Playlist = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userPlaylist, setUserPlaylist] = useState<UserPlaylistResponse | null>(null);

	const fetchPlaylist = async () => {
		if (status === "authenticated" && session) {
			try {
				const limit = 30;
				const response = await axios.get(`/api/playlist?limit=${limit}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setUserPlaylist(response.data.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		}
	};

	useEffect(() => {
		fetchPlaylist();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
				<h2 className="text-center text-xl font-bold lg:text-2xl">Your Playlists</h2>
			</header>

			<section className="md:lg-grid-cols-3 grid w-full grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-5">
				{userPlaylist?.items?.map((playlist) => (
					<div key={playlist.id}>
						<Link
							className="flex w-full flex-col items-center gap-y-4 text-center lg:w-auto"
							href={`/playlists/${playlist.id}`}
						>
							<div>
								<picture>
									<img
										className="h-[150px] w-[150px] object-cover transition-opacity hover:opacity-50 md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
										src={playlist.images[0].url}
										alt={playlist.name}
									/>
								</picture>
							</div>

							<Link href={`/playlists/${playlist.id}`} className="font-semibold hover:underline">
								{playlist.name}
							</Link>

							<div className="-mt-4 flex items-center gap-x-4">
								<span className="text-center text-sm uppercase text-slate-500">
									{playlist.tracks?.total} tracks
								</span>
								<DotIcon />
								<span className="flex items-center">
									{playlist.public ? (
										<UnlockIcon size={15} color="green" />
									) : (
										<LockIcon size={15} color="red" />
									)}
								</span>
							</div>
						</Link>
					</div>
				))}
			</section>
		</div>
	);
};

export default Playlist;
