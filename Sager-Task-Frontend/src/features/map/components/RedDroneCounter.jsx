import { useDrones } from "../../../context/DronesContext";
import useRedDroneCount from "../hooks/useRedDroneCount";

// Small widget showing count of non-allowed (red) drones
export function RedDroneCounter() {
	const { uniqueDrones } = useDrones();
	const count = useRedDroneCount(uniqueDrones);

	return (
		<div className="absolute bottom-5 right-5 z-20 bg-white text-sm text-gray-900 px-4 py-3 rounded-lg shadow-lg ">
			<p>
				<span className="text-center p-1 bg-black rounded-full text-white ">
					{count}
				</span>{" "}
				Drone Flying
			</p>
		</div>
	);
}
