import { Track } from "./shared";

interface Context {
	type: string;
	href: string;
	external_urls: {
		spotify: string;
	};
	uri: string;
}

interface PlayedItem {
	track: Track;
	played_at: string;
	context: Context;
}

interface UserRecentlyPlayedResponse {
	href: string;
	limit: number;
	next: string | null;
	cursors: {
		after: string;
		before: string;
	};
	total: number;
	items: PlayedItem[];
}

export type { UserRecentlyPlayedResponse };
