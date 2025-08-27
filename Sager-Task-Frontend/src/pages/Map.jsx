import DroneMap from "../features/map/components/DroneMap";
import DronesList from "../features/map/components/DronesList";

function Map() {
	return (
		<div className="relative w-full h-full">
			<DroneMap />
			<DronesList />
		</div>
	);
}

export default Map;
