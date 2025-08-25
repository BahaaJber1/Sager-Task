import DroneMap from "../features/map/DroneMap";
import DronesList from "../features/map/DronesList";

function Map() {
	return (
		<div className="relative w-full h-full">
			<DroneMap />
			<DronesList />
		</div>
	);
}

export default Map;
