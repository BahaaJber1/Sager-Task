


export default function updateDronePaths(newDrones, prevPaths = {}) {
	const newPaths = { ...prevPaths };
	newDrones.forEach((drone) => {
		const reg = drone.properties.registration;
		const coords = drone.geometry.coordinates;
		const yaw = drone.properties.yaw;
		const point = [...coords, yaw]; // [lng, lat, yaw]
		const path = newPaths[reg] || [];
		// Only add if it's a new point
		if (
			!path.length ||
			path[path.length - 1][0] !== coords[0] ||
			path[path.length - 1][1] !== coords[1] ||
			path[path.length - 1][2] !== yaw
		) {
			newPaths[reg] = [...path, point];
		}
	});
	return newPaths;
}
