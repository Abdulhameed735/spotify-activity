import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
	}

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	if (id) {
		const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
			headers: {
				Authorization: accessToken
			}
		});

		const data = await response.json();

		return NextResponse.json({
			data
		});
	} else {
		const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
			headers: {
				Authorization: accessToken
			}
		});

		const data = await response.json();

		return NextResponse.json({
			hello: "My request works",
			data
		});
	}
}
