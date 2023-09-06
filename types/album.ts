import { Image, ExternalUrls } from ".";

interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface Restrictions {
	reason: string;
}

interface Track {
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: {
		external_urls: ExternalUrls;
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	restrictions: Restrictions;
	name: string;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

interface Copyright {
	text: string;
	type: string;
}

interface ExternalIds {
	isrc: string;
	ean: string;
	upc: string;
}

interface AlbumData {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: Restrictions;
	type: string;
	uri: string;
	artists: Artist[];
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
		items: Track[];
	};
	copyrights: Copyright[];
	external_ids: ExternalIds;
	genres: string[];
	label: string;
	popularity: number;
}

export type { AlbumData };
