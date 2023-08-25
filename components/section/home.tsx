"use client";
import { useSession } from "next-auth/react";

const HomePage = () => {
	const { data: session } = useSession();

	if (!session) {
		return <p>Loading...</p>;
	}

	const { user } = session;

	return (
		<div className="container">
			<h1>Welcome, {user?.name}!</h1>
		</div>
	);
};

export default HomePage;
