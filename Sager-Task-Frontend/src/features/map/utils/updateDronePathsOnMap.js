export default function updateDronePathsOnMap({ map, dronePaths }) {
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
		const allowedToFly = registration?.split("-")[1]?.startsWith("B");
		const lineColor = allowedToFly ? "#22c55e" : "#ff0000";
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
