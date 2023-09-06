"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { TracksData } from "@/types";
import { convertMillisecondsToTime } from "@/utils/convert-time";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";
import ScaleLoader from "react-spinners/ScaleLoader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TracksPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [tracksData, setTracksData] = useState<TracksData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	const fetchTracksData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/tracks-data?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setTracksData(response.data.data);
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

								<div className="flex items-center justify-center gap-x-4 lg:justify-start">
									<Link
										className="my-5 inline-block cursor-pointer rounded-3xl bg-green-500 px-3 py-2 font-semibold uppercase"
										href={tracksData.tracksInfo.external_urls.spotify}
										target="_blank"
									>
										Play on Spotify
									</Link>
									{tracksData.tracksInfo.preview_url && (
										<div className="flex items-center gap-2">
											<button
												className={`my-5 inline-block cursor-pointer rounded-3xl bg-green-500 px-3 py-2 font-semibold uppercase ${
													isPlaying ? "bg-red-500" : ""
												}`}
												onClick={() => setIsPlaying(!isPlaying)}
											>
												{isPlaying ? "Pause Preview" : "Play Preview"}
											</button>
											{isPlaying && (
												<audio
													src={tracksData.tracksInfo.preview_url}
													autoPlay
													onEnded={() => setIsPlaying(false)}
												/>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					)}

					{tracksData?.tracksAudioAnalysis && (
						<div>
							<h1 className="mb-5 text-2xl font-semibold lg:text-3xl">Track Analysis</h1>
							<div className="mb-10 grid w-full grid-cols-2 border-l border-t text-center lg:grid-cols-5">
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{convertMillisecondsToTime(tracksData.tracksAudioFeatures.duration_ms)}
									</h4>
									<p className="text-sm text-slate-600">Duration</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">{tracksData.tracksInfo.popularity}</h4>
									<p className="text-sm text-slate-600">Popularity</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.track.key}
									</h4>
									<p className="text-sm text-slate-600">Key</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.track.mode}
									</h4>
									<p className="text-sm text-slate-600">Modality</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.track.time_signature}
									</h4>
									<p className="text-sm text-slate-600">Time Signature</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.track.tempo}
									</h4>
									<p className="text-sm text-slate-600">Tempo (BPM)</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.beats.length}
									</h4>
									<p className="text-sm text-slate-600">Beats</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.bars.length}
									</h4>
									<p className="text-sm text-slate-600">Bars</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.sections.length}
									</h4>
									<p className="text-sm text-slate-600">Sections</p>
								</div>
								<div className="border-b border-r px-3 py-4">
									<h4 className="text-lg font-medium">
										{tracksData.tracksAudioAnalysis.segments.length}
									</h4>
									<p className="text-sm text-slate-600">Segments</p>
								</div>
							</div>
						</div>
					)}

					{tracksData?.tracksAudioFeatures && (
						<div>
							<h1 className="mb-5 text-2xl font-semibold lg:text-3xl">Track Features</h1>
							<div>
								<Bar
									data={{
										labels: [
											"acousticness",
											"danceability",
											"energy",
											"liveness",
											"speechiness",
											"valence"
										],
										datasets: [
											{
												label: "Audio Features",
												data: [
													tracksData.tracksAudioFeatures.acousticness,
													tracksData.tracksAudioFeatures.danceability,
													tracksData.tracksAudioFeatures.energy,
													tracksData.tracksAudioFeatures.liveness,
													tracksData.tracksAudioFeatures.speechiness,
													tracksData.tracksAudioFeatures.valence
												],
												borderWidth: 1,
												backgroundColor: "rgba(75, 192, 192, 0.2)",
												borderColor: "rgba(75, 192, 192, 1)"
											}
										]
									}}
								/>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TracksPage;
