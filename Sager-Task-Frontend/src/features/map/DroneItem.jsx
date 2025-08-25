import HorizontalLine from "../../components/HorizontalLine";

function DroneItem({ drone }) {
	const { serial, registration, Name, organization, pilot } = drone.properties;

	return (
		<li>
			<h3>{Name}</h3>
			Serial # {serial} - Registration #{registration} - Pilot {pilot} -
			Organization {organization}
			<HorizontalLine />
		</li>
	);
}

export default DroneItem;
