import { withAuth } from "@/helpers/protected-route";

const TopArtists = () => {
	return (
		<div>
			<h1>Top Artists</h1>
		</div>
	);
};

export default withAuth(TopArtists);
