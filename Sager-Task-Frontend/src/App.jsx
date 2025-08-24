import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
	const [drones, setDrones] = useState([]);

	useEffect(() => {
		const socket = io("http://localhost:9013");

		socket.on("message", (data) => {
			setDrones((prev) => [...prev, ...data.features]);
		});

		return () => socket.disconnect();
	}, []);

	return (
		<>
			<ul>
				<h2>DRONE FLYING</h2>
				{drones.map((drone, index) => {
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
