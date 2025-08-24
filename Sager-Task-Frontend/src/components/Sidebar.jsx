import { NavLink, useSearchParams } from "react-router";

function Sidebar() {
	return (
		<aside className="p-5 min-h-[92.1vh]">
			<ul className="flex flex-col gap-10">
				<li>
					<NavLink to="/" className="flex flex-col items-center">
						<img src="dashboard-svgrepo-com-2.svg" />
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to="map" className="flex flex-col items-center">
						<img src="location-svgrepo-com-2.svg" />
						Map
					</NavLink>
				</li>
			</ul>
		</aside>
	);
}

export default Sidebar;
