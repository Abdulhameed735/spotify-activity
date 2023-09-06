"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { ArtistData } from "@/types";
import TrackListItem from "@/components/ui/tracklist-item";
import ScaleLoader from "react-spinners/ScaleLoader";

const ArtistPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [artistsData, setArtistsData] = useState<ArtistData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchArtistsData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/artists-data?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setArtistsData(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchArtistsData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<ScaleLoader
						color={"green"}
						loading={isLoading}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
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
											<h6 key={genre} className="ml-2 text-sm lg:text-base">
												{genre}
											</h6>
										))}
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="flex flex-col gap-y-5 px-5">
						<h2 className="text-center text-xl  font-semibold">Artist discography</h2>
						<div className="flex flex-col gap-y-3">
							<h2 className="text-lg font-medium">Albums</h2>
							<div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3">
								{artistsData?.artistAlbums.items.map((albums) => (
									<div
										key={albums.id}
										className="flex w-full flex-col items-center gap-y-4 text-center lg:w-auto"
									>
										<div>
											<picture>
												<img
													className="h-[130px] w-[130px] rounded object-cover md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px]"
													src={albums.images[0].url}
													alt={albums.name}
												/>
											</picture>
										</div>

										<Link href={`/albums/${albums.id}`} className="font-semibold hover:underline">
											{albums.name}
										</Link>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-y-3">
							<h2 className="text-lg font-medium">Popular releases</h2>
							<ul className="flex flex-col gap-y-4">
								{artistsData?.artistTopTracks.tracks.map((track) => (
									<li key={track.id}>
										<TrackListItem track={track} />
									</li>
								))}
							</ul>
						</div>

						<div className="flex flex-col gap-y-3">
							<h2 className="text-lg font-medium">Fans also like</h2>

							<div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3">
								{artistsData?.relatedArtists.artists.map((artists) => (
									<div
										key={artists.id}
										className="flex w-full flex-col items-center gap-y-4 text-center lg:w-auto"
									>
										<div>
											<picture>
												<img
													className="h-[130px] w-[130px] rounded-full object-cover md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px]"
													src={artists.images[0].url}
													alt={artists.name}
												/>
											</picture>
										</div>

										<Link href={`/artists/${artists.id}`} className="font-semibold hover:underline">
											{artists.name}
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ArtistPage;
