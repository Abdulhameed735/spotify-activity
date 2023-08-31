import { Artist, Track, Album } from ".";

interface ArtistData {
	artistInfo: Artist;
	artistAlbums: {
		items: Album[];
	};
	artistTopTracks: { tracks: Track[] };
	relatedArtists: { artists: Artist[] };
}

export type { ArtistData };
