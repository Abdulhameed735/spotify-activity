import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const accessToken = request.headers.get("Authorization");
	const url = new URL(request.url);
	const limit = parseInt(url.searchParams.get("limit") || "10", 10);
	const timeRange = url.searchParams.get("time_range") || "long_term";
	const topItem = url.searchParams.get("top_item");

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const response = await fetch(
		`https://api.spotify.com/v1/me/top/${topItem}?limit=${limit}&time_range=${timeRange}`,
		{
			headers: {
				Authorization: accessToken
			}
		}
	);

	const data = await response.json();

	return NextResponse.json({
		hello: "My request works",
		data
	});
}
