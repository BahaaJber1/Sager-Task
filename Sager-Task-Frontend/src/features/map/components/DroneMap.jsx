import { useRef, useEffect } from "react";
import { useParams } from "react-router";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDrones } from "../../../context/DronesContext";
import useDroneMapLogic from "../hooks/useDroneMapLogic";
import { RedDroneCounter } from "./RedDroneCounter";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function DroneMap() {
	const { lat, lng } = useParams();
	const mapContainer = useRef(null);
	const mapRef = useRef(null);
	const { uniqueDrones, dronePaths } = useDrones();

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

	// Custom hook handles all marker and path logic
	useDroneMapLogic({ mapRef, uniqueDrones, dronePaths });

	return (
		<div ref={mapContainer} className="absolute top-0 left-0 w-full h-full z-0">
			<RedDroneCounter />
		</div>
	);
}

export default DroneMap;
