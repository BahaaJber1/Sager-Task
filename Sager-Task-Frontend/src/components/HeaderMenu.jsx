import { Link } from "react-router";

function HeaderMenu() {
	return (
		<ul className="flex gap-5">
			<li>
				<Link>
					<img src="capture-svgrepo-com.svg" />
				</Link>
			</li>
			<li>
				<Link>
					<img src="language-svgrepo-com.svg" />
				</Link>
			</li>
			<li>
				<Link>
					<img src="bell.svg" />
				</Link>
			</li>
		</ul>
	);
}

export default HeaderMenu;
