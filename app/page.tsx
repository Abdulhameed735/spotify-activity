"use client";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/section/landing";
import HomePage from "@/components/section/home";

export default function Home() {
	const { data: session } = useSession();

	return session ? <HomePage /> : <LandingPage />;
}
