import { useDrone } from "../../../context/DroneContext";

import DroneItem from "./DroneItem";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { useState } from "react";

function DronesList() {
	const { drones, status, error } = useDrone();
	const [isOpen, setIsOpen] = useState(true);

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

			{isOpen &&
				drones.map((drone) => {
					return <DroneItem drone={drone} key={drone.properties.serial} />;
				})}
		</ul>
	);
}

export default DronesList;
