import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router";
import { useDrone } from "../../context/DroneContext";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function DroneMap() {
	const { lat, lng } = useParams();
	const mapContainer = useRef(null);
	const mapRef = useRef(null);
	const { uniqueDrones, dronePaths } = useDrone();

	useEffect(() => {
		if (!mapContainer.current) return;

		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10",
			center: [35.93131881204147, 31.94878648036645],
			zoom: 8,
		});
		mapRef.current = map;

		return () => map.remove();
	}, []);

	useEffect(() => {
		if (lat && lng && mapRef.current) {
			mapRef.current.flyTo({
				center: [lng, lat],
				zoom: 15,
			});
		}
	}, [lat, lng]);

	// Add custom markers for each drone
	useEffect(() => {
		const map = mapRef.current;
		if (!map || !uniqueDrones) return;

		// Remove previous markers
		if (map._droneMarkers) {
			map._droneMarkers.forEach((marker) => marker.remove());
		}
		map._droneMarkers = [];

		// Store flight start times in a local ref
		const flightStartTimesRef = map._flightStartTimes || {};
		if (!map._flightStartTimes) map._flightStartTimes = flightStartTimesRef;

		uniqueDrones.forEach((drone) => {
			const registration = drone.properties.registration;
			const path = dronePaths[registration];
			if (!path || !path.length) return;
			const [lng, lat, yaw] = path[path.length - 1]; // latest position and yaw
			const isAllowed = registration?.split("-")[1]?.startsWith("B");

			// Set flight start time if not already set
			if (!flightStartTimesRef[registration]) {
				flightStartTimesRef[registration] = Date.now();
			}
			const start = flightStartTimesRef[registration];
			const flightSeconds = Math.floor((Date.now() - start) / 1000);
			const flightTime = new Date(flightSeconds * 1000)
				.toISOString()
				.substr(11, 8); // hh:mm:ss

			const el = document.createElement("div");
			el.className = `w-8 h-8 rounded-full flex items-center justify-center ${
				isAllowed ? "bg-green-500" : "bg-red-600"
			}`;
			el.style.backgroundImage = "url(/drone.svg)";
			el.style.backgroundRepeat = "no-repeat";
			el.style.backgroundPosition = "center";
			el.style.backgroundSize = "60%";
			el.style.transform = `rotate(${yaw}deg)`;

			// Create popup content using Tailwind classes
			const popupContent = document.createElement("div");
			popupContent.className = "p-2 bg-[#111] text-white rounded-lg";
			popupContent.innerHTML = `
				<div class='font-bold text-lg mb-1'>${drone.properties.Name || "Drone"}</div>
				<div>Altitude: <b>${drone.properties.altitude ?? "N/A"} m</b></div>
				<div>Flight Time: <b>${flightTime}</b></div>
			`;
			const popup = new mapboxgl.Popup({
				offset: 25,
				closeButton: false,
			}).setDOMContent(popupContent);

			const marker = new mapboxgl.Marker(el)
				.setLngLat([lng, lat])
				.setPopup(popup)
				.addTo(map);
			// Open popup on hover
			el.addEventListener("mouseenter", () => marker.togglePopup());
			el.addEventListener("mouseleave", () => marker.togglePopup());
			map._droneMarkers.push(marker);
		});
	}, [uniqueDrones, dronePaths]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		function updatePaths() {
			Object.entries(dronePaths).forEach(([registration, path]) => {
				if (path.length < 2) return;
				const sourceId = `drone-path-${registration}`;
				const layerId = `drone-path-layer-${registration}`;
				const geojson = {
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: path.map(([lng, lat]) => [lng, lat]),
					},
				};
				const isAllowed = registration?.split("-")[1]?.startsWith("B");
				const lineColor = isAllowed ? "#22c55e" : "#ff0000";
				if (map.getSource(sourceId)) {
					map.getSource(sourceId).setData(geojson);
				} else {
					map.addSource(sourceId, {
						type: "geojson",
						data: geojson,
					});
					map.addLayer({
						id: layerId,
						type: "line",
						source: sourceId,
						layout: {
							"line-join": "round",
							"line-cap": "round",
						},
						paint: {
							"line-color": lineColor,
							"line-width": 3,
						},
					});
				}
			});
		}

		if (map.isStyleLoaded()) {
			updatePaths();
		} else {
			map.once("style.load", updatePaths);
		}
	}, [dronePaths]);

	return (
		<div
			ref={mapContainer}
			className="absolute top-0 left-0 w-full h-full z-0"
		></div>
	);
}

export default DroneMap;
