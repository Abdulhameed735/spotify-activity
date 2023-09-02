import { PlaylistResponse } from ".";

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
