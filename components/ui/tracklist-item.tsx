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
		<Link className="flex gap-3" href={`/tracks/${track.id}`}>
			<div>
				<Image src={track.album.images[0].url} width={50} height={50} alt={track.name} />
			</div>
			<div className="flex w-full gap-2">
				<div className="flex-1 flex-col gap-y-1">
					<span className="hover:underline">{track.name}</span>
					<div className="flex gap-1 text-sm text-slate-300">
						{track.artists.map((artist, index) => (
							<div className="" key={artist.id}>
								<Link className="hover:underline" href={`/artists/${artist.id}`}>
									{artist.name}
								</Link>
								{index < track.artists.length - 1 && ", "}
							</div>
						))}
						·<span className="hover:underline">{track.album.name}</span>
					</div>
				</div>
				<span className="text-base">{convertMillisecondsToTime(track.duration_ms)}</span>
			</div>
		</Link>
	);
};

export default TrackListItem;
