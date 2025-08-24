import { useDrone } from "../../../context/DroneContext";

import DroneItem from "./DroneItem";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";

function DronesList() {
	const { drones, status, error } = useDrone();

	if (!drones) return null;

	if (status === "loading") return <Spinner />;

	if (status === "error") return <Error>{error}</Error>;

	return (
		<ul>
			<h2>DRONE FLYING</h2>

			{drones.map((drone) => {
				return <DroneItem drone={drone} key={drone.properties.serial} />;
			})}
		</ul>
	);
}

export default DronesList;
