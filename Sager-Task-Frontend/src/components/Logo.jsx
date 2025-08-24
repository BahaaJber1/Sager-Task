import { Link } from "react-router";

function Logo() {
	return (
		<Link to="/" className="flex">
			<img src="Logo.svg" />;
		</Link>
	);
}

export default Logo;
