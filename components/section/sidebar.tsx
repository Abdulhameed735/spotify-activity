import { User2Icon, Mic2Icon, MusicIcon, HistoryIcon } from "lucide-react";
import Link from "next/link";

const navmenu = [
	{
		id: 1,
		name: "Profile",
		icon: User2Icon,
		url: "/"
	},
	{
		id: 2,
		name: "Top Artists",
		icon: Mic2Icon,
		url: "/artists"
	},
	{
		id: 3,
		name: "Top Tracks",
		icon: MusicIcon,
		url: "/tracks"
	},
	{
		id: 4,
		name: "Recent",
		icon: HistoryIcon,
		url: "/recent"
	}
];

const Sidebar = () => {
	return (
		<div className="fixed bottom-0 flex w-full flex-col items-center justify-between gap-3 bg-slate-800 p-1 lg:left-0 lg:top-0 lg:w-[8%] lg:p-3">
			<div className="hidden lg:block">logo</div>

			<div className="flex flex-row gap-x-3 lg:flex-col lg:gap-y-8">
				{navmenu.map((item) => (
					<Link key={item.id} href={item.url}>
						<div className="flex flex-col items-center gap-y-2 text-white">
							<item.icon size={24} />
							<span className="text-center text-sm">{item.name}</span>
						</div>
					</Link>
				))}
			</div>

			<div className="hidden lg:block">GitHub</div>
		</div>
	);
};

export default Sidebar;
