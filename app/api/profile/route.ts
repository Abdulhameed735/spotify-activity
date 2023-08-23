import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const response = await fetch("https://api.spotify.com/v1/me", {
		headers: {
			Authorization: accessToken
		}
	});

	console.log(accessToken);

	const data = await response.json();

	return NextResponse.json({
		hello: "My request works",
		accessToken: accessToken,
		data
	});
}
