import React from "react";
import Link from "next/link";
import Image from "next/image";
import { convertMillisecondsToTime } from "@/utils/convert-time";

interface TrackListItemProps {
	track: {
		id: string;
		name: string;
		album: {
			images: { url: string }[];
			name: string;
		};
		artists: { id: string; name: string }[];
		duration_ms: number;
	};
}

const TrackListItem: React.FC<TrackListItemProps> = ({ track }) => {
	return (
		<Link className="c-grid" href={`/tracks/${track.id}`}>
			<div className="pr-2">
				<Image src={track.album.images[0].url} width={50} height={50} alt={track.name} />
			</div>
			<div className="d2-grid">
				<div className="d3-grid">
					<span className="mb-1.5 hover:underline">{track.name}</span>
					<div className="d4-grid">
						{track.artists.map((artist, index) => (
							<Link key={artist.id} className="hover:underline" href={`/artists/${artist.id}`}>
								{artist.name}
								{index < track.artists.length - 1 && ", "}
							</Link>
						))}
						&nbsp;·&nbsp;&nbsp;<span className="hover:underline">{track.album.name}</span>
					</div>
				</div>
				<span className="text-base">{convertMillisecondsToTime(track.duration_ms)}</span>
			</div>
		</Link>
	);
};

export default TrackListItem;
