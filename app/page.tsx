"use client";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/page/landing";
import HomePage from "@/components/page/home";

export default function Home() {
	const { data: session } = useSession();

	return session ? <HomePage /> : <LandingPage />;
}
