export default function getFlightTime(start) {
	if (!start) return "00:00:00";
	const flightSeconds = Math.floor((Date.now() - start) / 1000);
	return new Date(flightSeconds * 1000).toISOString().substr(11, 8);
}
