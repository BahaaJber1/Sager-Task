import { useState } from "react";

import { useDrone } from "../../context/DroneContext";

import DroneItem from "./DroneItem";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import HorizontalLine from "../../components/HorizontalLine";
import { useParams } from "react-router";

function DronesList() {
	const { status, error, uniqueDrones } = useDrone();
	const [isOpen, setIsOpen] = useState(true);
	const [selectedTab, setSelectedTab] = useState("drones");
	const { registration } = useParams();

	function handleShow() {
		setIsOpen((isOpen) => !isOpen);
	}

	function handleTab(tab) {
		setSelectedTab(tab);
	}

	if (!uniqueDrones) return null;

	if (status === "loading") return <Spinner />;

	if (status === "error") return <Error>{error}</Error>;

	return (
		<div
			className={`${
				isOpen ? "" : "opacity-50"
			} absolute top-0 left-5 z-10 w-[330px] bg-[#111]  overflow-y-scroll no-scrollbar h-full`}
		>
			<div className="sticky top-0 bg-[#111] z-20">
				<h2 className="pb-10 text-2xl font-bold flex justify-between p-5">
					DRONE FLYING
					<span
						className="bg-[#272727] w-6 h-6 text-center rounded-full text-black cursor-pointer text-base"
						onClick={handleShow}
					>
						{isOpen ? <span>&or;</span> : <span>&and;</span>}
					</span>
				</h2>

				<ul className="flex gap-5 pb-5">
					<li>
						<button
							className={`px-4 py-2 cursor-pointer ${
								selectedTab === "drones"
									? "border-b-4 border-red-800"
									: "text-gray-400"
							}`}
							onClick={() => handleTab("drones")}
						>
							Drones
						</button>
					</li>
					<li>
						<button
							className={`px-4 py-2 cursor-pointer ${
								selectedTab === "history"
									? "border-b-4 border-red-800"
									: "text-gray-400"
							}`}
							onClick={() => handleTab("history")}
						>
							Flights History
						</button>
					</li>
				</ul>
			</div>

			<HorizontalLine />

			{isOpen &&
				selectedTab === "drones" &&
				uniqueDrones.map((drone) => {
					return (
						<DroneItem
							drone={drone}
							key={drone.properties.registration}
							selected={drone.properties.registration === registration}
						/>
					);
				})}

			{isOpen && selectedTab === "history" && (
				<p className="text-gray-400 mt-4 p-5">No flight history available.</p>
			)}
		</div>
	);
}

export default DronesList;
