const TopArtists = () => {
	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
				<h2 className="text-center text-xl font-bold lg:text-2xl">Top Artists</h2>
				<div className="flex justify-around gap-3">
					<button className="bg-transparent p-2 font-semibold">
						<span>All Time</span>
					</button>

					<button className="bg-transparent p-2 font-semibold">
						<span>Last 6 months</span>
					</button>

					<button className="bg-transparent p-2 font-semibold">
						<span>Last 4 weeks</span>
					</button>
				</div>
			</header>
		</div>
	);
};

export default TopArtists;
