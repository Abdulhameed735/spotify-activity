"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/section/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push("/");
		}
	}, [session, router]);

	return (
		<main className="relative flex min-h-screen w-full flex-col bg-slate-950 text-white lg:flex-row">
			<aside className="w-[8%] bg-slate-800">
				<Sidebar />
			</aside>
			{children}
		</main>
	);
};

export default HomeLayout;
