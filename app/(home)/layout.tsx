import Sidebar from "@/components/section/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
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
