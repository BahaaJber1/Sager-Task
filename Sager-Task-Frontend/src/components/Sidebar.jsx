import { NavLink } from "react-router";
import HorizontalLine from "./HorizontalLine";

function Sidebar() {
	return (
		<aside className="py-8">
			<ul className="flex flex-col">
				<li className="h-20 flex justify-center items-center divide-amber-950">
					<NavLink to="/" className="flex flex-col items-center">
						<img src="dashboard-svgrepo-com-2.svg" />
						Dashboard
					</NavLink>
				</li>

				<HorizontalLine />

				<li className="h-20 flex justify-center items-center">
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
