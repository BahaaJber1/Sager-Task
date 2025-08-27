import mapboxgl from "mapbox-gl";
import getFlightTime from "./getFlightTime";

export default function createDroneMarker({
	drone,
	path,
	map,
	flightStartTime,
}) {
	const registration = drone.properties.registration;
	const [lng, lat, yaw] = path[path.length - 1];
	const allowedToFly = registration?.split("-")[1]?.startsWith("B");
	const flightTime = getFlightTime(flightStartTime);

	const el = document.createElement("div");
	el.className = `w-8 h-8 rounded-full flex items-center justify-center ${
		allowedToFly ? "bg-green-500" : "bg-red-600"
	}`;
	el.style.backgroundImage = "url(/drone.svg)";
	el.style.backgroundRepeat = "no-repeat";
	el.style.backgroundPosition = "center";
	el.style.backgroundSize = "60%";
	el.style.transform = `rotate(${yaw}deg)`;

	const popupContent = document.createElement("div");
	popupContent.className = "p-2 bg-[#111] text-white rounded-lg";
	popupContent.innerHTML = `
		<div class='font-bold text-base mb-1'>${drone.properties.Name || "Drone"}</div>
		<div class='flex justify-between gap-4 text-sm'>
			<div>
				<div class='opacity-80'>Altitude</div>
				<div>${drone.properties.altitude ?? "N/A"} m</div>
			</div>
			<div>
				<div class='opacity-80'>Flight Time</div>
				<div>${flightTime}</div>
			</div>
		</div>
	`;
	const popup = new mapboxgl.Popup({
		offset: 25,
		closeButton: false,
	}).setDOMContent(popupContent);

	const marker = new mapboxgl.Marker(el)
		.setLngLat([lng, lat])
		.setPopup(popup)
		.addTo(map);

	el.addEventListener("mouseenter", () => marker.togglePopup());
	el.addEventListener("mouseleave", () => marker.togglePopup());

	return marker;
}
