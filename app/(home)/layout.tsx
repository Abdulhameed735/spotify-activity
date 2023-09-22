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
		<main className="h-full min-h-[100dvh] w-full bg-slate-950 text-white ">
			<div className="pb-[50px] pl-0 lg:pl-[100px]">
				<Sidebar />

				<div>{children}</div>
			</div>
		</main>
	);
};

export default HomeLayout;
