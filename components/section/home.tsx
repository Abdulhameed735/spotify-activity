"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
	const { data: session } = useSession();

	if (!session) {
		return <p>Loading...</p>;
	}

	const { user } = session;

	return (
		<div className="container">
			<h1>Welcome, {user?.name}!</h1>
			<Button className="rounded-lg bg-[#1db954] hover:bg-[#1ed655be]" onClick={() => signOut()}>
				Sign out
			</Button>
		</div>
	);
};

export default HomePage;
