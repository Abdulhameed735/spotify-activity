import { Track } from ".";

interface UserTopTracksResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: Track[];
}

export type { UserTopTracksResponse };
