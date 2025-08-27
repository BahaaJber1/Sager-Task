import { useNavigate } from "react-router";
import HorizontalLine from "../../../components/HorizontalLine";
import { useDrones } from "../../../context/DronesContext";
import useDroneItemData from "../hooks/useDroneItemData";

// Presentational drone list item; derives computed data via hook
function DroneItem({ drone, selected }) {
	const { dronePaths } = useDrones();
	const { serial, registration, Name, organization, pilot, lng, lat, isAllowed } =
		useDroneItemData({ drone, dronePaths });
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/map/${registration}/${lat}/${lng}`);
	}

	return (
		<div
			onClick={handleClick}
			className={`cursor-pointer ${selected ? "bg-[#272727]" : ""} w-full`}
		>
			<li className="grid grid-cols-[1fr_auto] p-5">
				<div>
					<h3 className="text-xl font-bold mb-4 pb-2">{Name}</h3>
					<div className="grid grid-cols-2 gap-4 mb-2">
						<div>
							<span className="text-gray-400">Serial #</span>
							<br />
							{serial}
						</div>
						<div>
							<span className="text-gray-400">Registration #</span>
							<br />
							{registration}
						</div>
						<div>
							<span className="text-gray-400">Pilot</span>
							<br />
							{pilot}
						</div>
						<div>
							<span className="text-gray-400">Organization</span>
							<br />
							{organization}
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<span
						className={`w-6 h-6 rounded-full border-2 border-white ${
							isAllowed ? "bg-green-500" : "bg-red-600"
						}`}
					></span>
				</div>
				<div className="col-span-2 mt-2">
					<HorizontalLine />
				</div>
			</li>
		</div>
	);
}

export default DroneItem;
