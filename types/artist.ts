import { Artist } from ".";

interface UserTopArtistsResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: Artist[];
}

export type { UserTopArtistsResponse };
