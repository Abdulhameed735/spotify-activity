"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Home = () => {
	const { data: session } = useSession();
	return <div>Home page</div>;
};

export default Home;
