import { useState } from "react";
import { NavLink, useLocation } from "react-router";

import { useDrone } from "../../../context/DroneContext";

import DroneItem from "./DroneItem";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";

function DronesList() {
	const { drones, status, error } = useDrone();
	const [isOpen, setIsOpen] = useState(true);

	const location = useLocation();

	function handleShow() {
		setIsOpen((isOpen) => !isOpen);
	}

	if (!drones) return null;

	if (status === "loading") return <Spinner />;

	if (status === "error") return <Error>{error}</Error>;

	return (
		<ul
			className={`${
				isOpen ? "" : "opacity-50"
			} w-[330px] bg-[#111] p-5 overflow-y-scroll no-scrollbar max-h-screen`}
		>
			<h2 className="pb-10 font-bold flex justify-between">
				DRONE FLYING
				<span
					className="bg-[#272727] w-6 h-6 text-center rounded-full text-black cursor-pointer"
					onClick={handleShow}
				>
					{isOpen ? <span>&or;</span> : <span>&and;</span>}
				</span>
			</h2>

			<ul className="flex gap-5 pb-5">
				<li>
					<NavLink to="/map">Drones</NavLink>
				</li>
				<li>
					<NavLink to="/map/previous">Fligts History</NavLink>
				</li>
			</ul>

			{isOpen &&
				location.pathname === "/map" &&
				drones.map((drone) => {
					return <DroneItem drone={drone} key={drone.properties.serial} />;
				})}

			{isOpen && location.pathname === "/map/previous" && <span>Previous</span>}
		</ul>
	);
}

export default DronesList;
