import { Outlet } from "react-router";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
	return (
		<div className="min-h-screen h-screen flex flex-col">
			<Header />
			{/* Sidebar + main content area */}
			<div className="flex-1 grid grid-cols-[120px_1fr] bg-[#111] text-white">
				<Sidebar />
				<main className="px-4 py-2">
					{/* Nested route outlet */}
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
