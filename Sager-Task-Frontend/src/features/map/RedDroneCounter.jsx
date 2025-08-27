import { useDrones } from "../../context/DronesContext";

export function RedDroneCounter() {
	const { uniqueDrones } = useDrones();

	const count = uniqueDrones.filter((drone) => {
		const reg = drone.properties.registration;
		return !reg?.split("-")[1]?.startsWith("B");
	}).length;

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
