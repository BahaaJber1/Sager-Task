import { Link } from "react-router";
import useHeaderMenuItems from "./hooks/useHeaderMenuItems";

function HeaderMenu() {
	const items = useHeaderMenuItems();
	return (
		<ul className="flex gap-5">
			{items.map((item) => (
				<li key={item.key}>
					<Link>
						<img src={item.icon} />
					</Link>
				</li>
			))}
		</ul>
	);
}

export default HeaderMenu;
