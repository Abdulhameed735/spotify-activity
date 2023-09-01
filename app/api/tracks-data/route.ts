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
		`https://api.spotify.com/v1/tracks/${id}`,
		`https://api.spotify.com/v1/audio-features/${id}`,
		`https://api.spotify.com/v1/audio-analysis/${id}`
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
		tracksInfo: responses[0],
		tracksAudioFeatures: responses[1],
		tracksAudioAnalysis: responses[2]
	};

	return NextResponse.json({
		hello: "My request works",
		data
	});
}
