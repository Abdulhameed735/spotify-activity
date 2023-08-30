import { Image } from ".";

interface ExternalUrls {
	spotify: string;
}

interface Owner {
	external_urls: ExternalUrls;
	followers: {
		href: string;
		total: number;
	};
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name: string;
}

interface Tracks {
	href: string;
	total: number;
}

interface PlaylistResponse {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

interface UserPlaylistResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: PlaylistResponse[];
}

export type { UserPlaylistResponse };
