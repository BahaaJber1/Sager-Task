import { NavLink } from "react-router";
import HorizontalLine from "./HorizontalLine";
import useSidebarItems from "./hooks/useSidebarItems";

function Sidebar() {
	const items = useSidebarItems();
	return (
		<aside className="py-8">
			<ul className="flex flex-col">
				{items.map((item, index) => (
					<>
						<li key={item.to} className="h-20 flex justify-center items-center divide-amber-950">
							<NavLink to={item.to} className="flex flex-col items-center">
								<img src={item.icon} />
								{item.label}
							</NavLink>
						</li>
						{index === 0 && <HorizontalLine />}
					</>
				))}
			</ul>
		</aside>
	);
}

export default Sidebar;
