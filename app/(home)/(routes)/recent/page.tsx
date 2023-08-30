const RecentPage = () => {
	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
				<h2 className="text-center text-xl font-bold lg:text-2xl">Recently Played Tracks</h2>
				<div className="flex justify-around gap-3">
					{/* <button
			className={cn(
				"bg-transparent p-2 font-semibold",
				selectedTimeRange === "long_term" ? "underline" : ""
			)}
			onClick={() => fetchTopArtists("long_term")}
		>
			<span>All Time</span>
		</button>

		<button
			className={cn(
				"bg-transparent p-2 font-semibold",
				selectedTimeRange === "medium_term" ? "underline" : ""
			)}
			onClick={() => fetchTopArtists("medium_term")}
		>
			<span>Last 6 months</span>
		</button>

		<button
			className={cn(
				"bg-transparent p-2 font-semibold",
				selectedTimeRange === "short_term" ? "underline" : ""
			)}
			onClick={() => fetchTopArtists("short_term")}
		>
			<span>Last 4 weeks</span>
		</button> */}
				</div>
			</header>
		</div>
	);
};

export default RecentPage;
