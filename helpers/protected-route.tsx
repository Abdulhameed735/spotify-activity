import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type WithAuthProps = {
	children: React.ReactNode;
};

export function withAuth(Component: React.ComponentType<any>) {
	return function WithAuth({ children, ...props }: WithAuthProps) {
		const { data: session } = useSession();
		const router = useRouter();

		if (!session) {
			router.replace("/");
			return null;
		}

		return <Component {...props}>{children}</Component>;
	};
}
