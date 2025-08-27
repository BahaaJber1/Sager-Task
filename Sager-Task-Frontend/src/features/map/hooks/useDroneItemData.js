import { useMemo } from "react";

/**
 * Prepare computed props for a DroneItem.
 * Centralizes derivation of last known location and allowed status.
 */
export default function useDroneItemData({ drone, dronePaths }) {
    const data = useMemo(() => {
        const { serial, registration, Name, organization, pilot } =
            drone.properties || {};

        const path = (dronePaths && registration && dronePaths[registration]) || [];
        const latest = path && path.length ? path[path.length - 1] : drone?.geometry?.coordinates;

        const lng = latest?.[0];
        const lat = latest?.[1];

        const isAllowed = !!registration?.split("-")?.[1]?.startsWith("B");

        return { serial, registration, Name, organization, pilot, path, latest, lng, lat, isAllowed };
    }, [drone, dronePaths]);

    return data;
}


