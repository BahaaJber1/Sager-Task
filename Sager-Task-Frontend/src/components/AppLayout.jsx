import { Outlet } from "react-router";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
	return (
		<>
			<Header />
			<div className="grid grid-cols-[120px_1fr] bg-[#111] text-white min-h-screen">
				<Sidebar />
				<main className="px-4 py-2 bg-gray-950">
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default AppLayout;
