import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
	"user-read-private",
	"user-read-email",
	"playlist-read-private",
	"playlist-modify-public",
	"user-library-read",
	"user-top-read",
	"user-follow-read",
	"user-follow-modify",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-recently-played",
	"user-read-playback-position",
	"user-read-currently-playing",
	"app-remote-control",
	"streaming"
].join(",");

const params = {
	scope: scopes
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyAPi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export default spotifyAPi;
export { LOGIN_URL };
