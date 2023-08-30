import { Image } from ".";

interface UserProfile {
	display_name: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	type: string;
	uri: string;
	followers: {
		href: null | string;
		total: number;
	};
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
}

export type { UserProfile };
