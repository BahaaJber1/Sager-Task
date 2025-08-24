import { Link } from "react-router";
import Logo from "./Logo";

function Header() {
	return (
		<ul className="h-18 pr-8 bg-black flex items-center justify-between">
			<Link to="/">
				<Logo />
			</Link>

			<div className="flex gap-8 items-center text-white">
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
				<li className="border-l p-5">
					<p>Hello, Bahaa Jber</p>
					<p>Frontend Enginner</p>
				</li>
			</div>
		</ul>
	);
}

export default Header;
