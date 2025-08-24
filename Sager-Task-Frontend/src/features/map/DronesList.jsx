import { useDrone } from "../../../context/DroneContext";
import DroneItem from "./DroneItem";

function DronesList() {
	const { drones, status, error } = useDrone();

	if (status === "error") return <Error>{error}</Error>;

	return (
		<ul>
			<h2>DRONE FLYING</h2>

			{drones.map((drone, index) => {
				if (!drone || !drone.properties) return null;
				return <DroneItem drone={drone} key={index} />;
			})}
		</ul>
	);
}

export default DronesList;
