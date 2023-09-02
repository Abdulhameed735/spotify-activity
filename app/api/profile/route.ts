import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const apiEndpoints = [`https://api.spotify.com/v1/me`, `https://api.spotify.com/v1/me/playlists`];

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
		profile: responses[0],
		playlist: responses[1]
	};

	return NextResponse.json({
		hello: "My request works",
		data
	});
}
