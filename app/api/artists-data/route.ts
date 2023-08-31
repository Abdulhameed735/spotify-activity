import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	if (!id) {
		return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
	}

	const apiEndpoints = [
		`https://api.spotify.com/v1/artists/${id}`,
		`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
		`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
		`https://api.spotify.com/v1/artists/${id}/related-artists`
	];

	const responses = await Promise.all(
		apiEndpoints.map(async (endpoint) => {
			const res = await fetch(endpoint, {
				headers: {
					Authorization: accessToken
				}
			});
			return res.json();
		})
	);

	const data = {
		artistInfo: responses[0],
		artistAlbums: responses[1],
		artistTopTracks: responses[2],
		relatedArtists: responses[3]
	};

	return NextResponse.json({
		hello: "My request works",
		data
	});
}
