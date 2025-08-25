import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function DroneMap() {
	const mapContainer = useRef(null);

	useEffect(() => {
		if (!mapContainer.current) return;

		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: [-0.481747846041145, 51.3233379650232], // [lng, lat]
			zoom: 8,
		});

		return () => map.remove();
	}, []);

	return (
		<div
			ref={mapContainer}
			className="absolute top-0 left-0 w-full h-full z-0"
		></div>
	);
}

export default DroneMap;
