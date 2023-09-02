"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { TracksData } from "@/types";
import { convertMillisecondsToTime } from "@/utils/convert-time";

const TracksPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [tracksData, setTracksData] = useState<TracksData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchTracksData();
	}, [status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="flex items-center justify-center">
					<p>Loading...</p>
				</div>
			) : (
				<>
					{tracksData?.tracksInfo && (
						<div className="mb-10 flex flex-col items-center lg:flex-row">
							<div className="max-w-[250px] lg:mr-10">
								<picture>
									<img
										className="h-[150px] w-[150px] rounded object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
										src={tracksData.tracksInfo.album.images[0].url}
										alt={tracksData.tracksInfo.name}
									/>
								</picture>
							</div>
							<div className="mt-4 flex-1 text-center lg:mt-0 lg:text-left">
								<h1 className="mb-1 text-2xl font-semibold lg:text-3xl">
									{tracksData.tracksInfo.name}
								</h1>
								<h2 className="mb-2 text-center text-xl font-medium text-slate-600 lg:text-left">
									{tracksData.tracksInfo.artists.map((artist, index) => (
										<span key={artist.id}>
											{artist.name}
											{index < tracksData.tracksInfo.artists.length - 1 ? ", " : ""}
										</span>
									))}
								</h2>

								<h3 className="text-base text-slate-500">
									<Link href={tracksData.tracksInfo.album.id}>
										{tracksData.tracksInfo.album.name}
									</Link>
									&nbsp;.&nbsp;{new Date(tracksData.tracksInfo.album.release_date).getFullYear()}
								</h3>

								<Link
									className="my-5 inline-block cursor-pointer rounded-3xl bg-green-500 px-3 py-2 font-semibold uppercase"
									href={tracksData.tracksInfo.external_urls.spotify}
									target="_blank"
								>
									Play on Spotify
								</Link>
							</div>
						</div>
					)}

					{tracksData?.tracksAudioAnalysis && (
						<div className="mb-10 grid w-full grid-cols-2 border-l border-t text-center lg:grid-cols-5">
							<div className="border-b border-r px-3 py-4">
								<h4>{convertMillisecondsToTime(tracksData.tracksAudioFeatures.duration_ms)}</h4>
								<p className="text-sm text-slate-600">Duration</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksInfo.popularity}</h4>
								<p className="text-sm text-slate-600">Popularity</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.track.key}</h4>
								<p className="text-sm text-slate-600">Key</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.track.mode}</h4>
								<p className="text-sm text-slate-600">Modality</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.track.time_signature}</h4>
								<p className="text-sm text-slate-600">Time Signature</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.track.tempo}</h4>
								<p className="text-sm text-slate-600">Tempo</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.beats.length}</h4>
								<p className="text-sm text-slate-600">Beats</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.bars.length}</h4>
								<p className="text-sm text-slate-600">Bars</p>
							</div>
							<div className="border-b border-r px-3 py-4">
								<h4>{tracksData.tracksAudioAnalysis.sections.length}</h4>
								<p className="text-sm text-slate-600">Sections</p>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TracksPage;
