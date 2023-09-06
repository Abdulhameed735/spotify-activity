import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
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
