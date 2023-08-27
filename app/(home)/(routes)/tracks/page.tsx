import { withAuth } from "@/helpers/protected-route";

const TopTracks = () => {
	return (
		<div>
			<h1>Top Tracks</h1>
		</div>
	);
};

export default withAuth(TopTracks);
