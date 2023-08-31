const TracksPage = async ({ params }: { params: { id: string } }) => {
	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			<h1>Tracks Page</h1> <p>Tracks ID: {params.id}</p>
		</div>
	);
};

export default TracksPage;
