import { Artist, Track, Album } from ".";

interface ArtistData {
	artistInfo: Artist;
	artistAlbums: {
		items: Album[];
	};
	artistTopTracks: { tracks: Track[] };
	artistRelatedArtists: Artist;
}

export type { ArtistData };
