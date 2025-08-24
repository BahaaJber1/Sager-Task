import { useDrone } from "../context/DroneContext";
import Error from "./components/Error";

function App() {
	const { drones, status, error } = useDrone();

	if (status === "error") return <Error>{error}</Error>;

	return (
		<>
			<ul>
				<h2>DRONE FLYING</h2>
				{drones.map((drone, index) => {
					if (!drone || !drone.properties) return null;
					const { serial, registration, Name, organization, pilot } =
						drone.properties;
					return (
						<li key={index}>
							<h3>{Name}</h3>
							Serial # {serial} - Registration #{registration} - Pilot {pilot} -
							Organization {organization}
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default App;
