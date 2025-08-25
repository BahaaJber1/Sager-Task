import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function DroneMap() {
	const { lat, lng } = useParams();
	const mapContainer = useRef(null);
	const mapRef = useRef(null); // <-- Add this

	useEffect(() => {
		if (!mapContainer.current) return;

		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10",
			center: [35.93131881204147, 31.94878648036645],
			zoom: 8,
		});
		mapRef.current = map; // <-- Assign map instance

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

	return (
		<div
			ref={mapContainer}
			className="absolute top-0 left-0 w-full h-full z-0"
		></div>
	);
}

export default DroneMap;
