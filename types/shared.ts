export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface ExternalUrls {
	spotify: string;
}

export interface UserProfile {
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

export interface Owner {
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

export interface Tracks {
	href: string;
	total: number;
}

export interface PlaylistResponse {
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

export interface Album {
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
	restrictions: {
		reason: string;
	};
	type: string;
	uri: string;
	artists: Artist[];
}

export interface Artist {
	external_urls: ExternalUrls;
	followers: {
		href: string;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: any;
	restrictions: {
		reason: string;
	};
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

export interface TrackAudioFeatures {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: string;
	uri: string;
	valence: number;
}

export interface TrackAudioAnalysisMetaData {
	analyzer_version: string;
	platform: string;
	detailed_status: string;
	status_code: number;
	timestamp: number;
	analysis_time: number;
	input_process: string;
}

export interface TrackAudioAnalysisTrackData {
	num_samples: number;
	duration: number;
	sample_md5: string;
	offset_seconds: number;
	window_seconds: number;
	analysis_sample_rate: number;
	analysis_channels: number;
	end_of_fade_in: number;
	start_of_fade_out: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	codestring: string;
	code_version: number;
	echoprintstring: string;
	echoprint_version: number;
	synchstring: string;
	synch_version: number;
	rhythmstring: string;
	rhythm_version: number;
}

export interface TrackAudioAnalysisBarData {
	start: number;
	duration: number;
	confidence: number;
}

export interface TrackAudioAnalysisBeatData {
	start: number;
	duration: number;
	confidence: number;
}

export interface TrackAudioAnalysisSectionData {
	start: number;
	duration: number;
	confidence: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
}

export interface TrackAudioAnalysisSegmentData {
	start: number;
	duration: number;
	confidence: number;
	loudness_start: number;
	loudness_max: number;
	loudness_max_time: number;
	loudness_end: number;
	pitches: number[];
	timbre: number[];
}

export interface TrackAudioAnalysisTatumData {
	start: number;
	duration: number;
	confidence: number;
}

export interface TrackAudioAnalysis {
	meta: TrackAudioAnalysisMetaData;
	track: TrackAudioAnalysisTrackData;
	bars: TrackAudioAnalysisBarData[];
	beats: TrackAudioAnalysisBeatData[];
	sections: TrackAudioAnalysisSectionData[];
	segments: TrackAudioAnalysisSegmentData[];
	tatums: TrackAudioAnalysisTatumData[];
}
