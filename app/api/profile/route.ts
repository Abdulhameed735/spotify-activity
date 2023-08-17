import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const { access_token } = req.query;

	try {
		const response = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		const { images } = response.data;
		const profileImageUrl = images[0]?.url;

		res.status(200).json({ profileImageUrl });
	} catch (error) {
		console.error("Error fetching profile image:", error);
	}
}
