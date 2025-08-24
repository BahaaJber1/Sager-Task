import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import HeaderUser from "./HeaderUser";

function Header() {
	return (
		<header className="h-18 px-8 bg-black flex items-center justify-between">
			<Logo />
			<div className="flex items-center gap-8">
				<HeaderMenu />
				<HeaderUser />
			</div>
		</header>
	);
}

export default Header;
