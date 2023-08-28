import Link from "next/link";
import { Button } from "@/components/ui/button";

const TopArtists = () => {
	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex items-center justify-between">
				<h3>Top Artists of All Time</h3>
				<Link href="/artists">
					<Button className="rounded-full border bg-transparent hover:border-[#1ed655be] hover:bg-[#1ed655be]">
						See more
					</Button>
				</Link>
			</div>

			<div>
				<ul>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	);
};

export default TopArtists;
