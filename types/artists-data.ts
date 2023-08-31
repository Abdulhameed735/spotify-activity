import { Artist, ExternalUrls, Track, Album } from ".";

interface ArtistData {
	artistInfo: Artist;
	artistAlbums: Album;
	artistTopTracks: Track;
	artistRelatedArtists: Artist;
}

export type { ArtistData };
