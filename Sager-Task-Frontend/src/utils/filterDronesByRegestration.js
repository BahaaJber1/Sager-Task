export default function filterDronesByRegestration(drones) {
	return drones.filter(
		(drone, idx, arr) =>
			arr.findIndex(
				(d) => d.properties.registration === drone.properties.registration
			) === idx
	);
}
