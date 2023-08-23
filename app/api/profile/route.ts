import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");

		if (!accessToken) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		// console.log(`Bearer ${accessToken}`);

		const data = await response.json();

		return NextResponse.json({
			hello: "My request works",
			accessToken: accessToken
		});
	} catch (error) {
		return NextResponse.error();
	}
}
