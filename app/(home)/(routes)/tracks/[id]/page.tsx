"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { ArtistData } from "@/types";
import TrackListItem from "@/components/ui/tracklist-item";

const TracksPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [tracksData, setTracksData] = useState<ArtistData | null>(null);

	const fetchTracksData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/artists-data?id=${params.id}`, {
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
			<h1>Tracks Page</h1> <p>Tracks ID: {params.id}</p>
		</div>
	);
};

export default TracksPage;
