import { useRef, useEffect } from "react";
import createDroneMarker from "../utils/createDroneMarker";
import updateDronePathsOnMap from "../utils/updateDronePathsOnMap";

/**
 * Custom hook to handle drone map logic: markers and paths.
 * @param {Object} params
 * @param {Object} params.mapRef - Ref to the Mapbox map instance.
 * @param {Object} params.uniqueDrones - Array of unique drone features.
 * @param {Object} params.dronePaths - Object of registration => path array.
 */
export default function useDroneMapLogic({ mapRef, uniqueDrones, dronePaths }) {
	// Track flight start times for each drone
	const flightStartTimesRef = useRef({});
	// Track markers for cleanup
	const droneMarkersRef = useRef([]);

	// Handle markers
	useEffect(() => {
		const map = mapRef.current;
		if (!map || !uniqueDrones) return;

		// Remove previous markers
		droneMarkersRef.current.forEach((marker) => marker.remove());
		droneMarkersRef.current = [];

		uniqueDrones.forEach((drone) => {
			const registration = drone.properties.registration;
			const path = dronePaths[registration];
			if (!path || !path.length) return;
			// Set flight start time if not already set
			if (!flightStartTimesRef.current[registration]) {
				flightStartTimesRef.current[registration] = Date.now();
			}
			const flightStartTime = flightStartTimesRef.current[registration];

			const marker = createDroneMarker({
				drone,
				path,
				map,
				flightStartTime,
			});
			droneMarkersRef.current.push(marker);
		});
	}, [uniqueDrones, dronePaths, mapRef]);

	// Handle path drawing
	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		const drawPaths = () => {
			updateDronePathsOnMap({ map, dronePaths });
		};

		if (map.isStyleLoaded()) {
			drawPaths();
		} else {
			map.once("style.load", drawPaths);
		}
	}, [dronePaths, mapRef]);
}
