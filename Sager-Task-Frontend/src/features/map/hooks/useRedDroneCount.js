import { useMemo } from "react";

/**
 * Compute number of non-allowed (red) drones from a unique list.
 */
export default function useRedDroneCount(uniqueDrones) {
    return useMemo(() => {
        if (!uniqueDrones) return 0;
        return uniqueDrones.filter((drone) => {
            const reg = drone?.properties?.registration;
            return !reg?.split("-")?.[1]?.startsWith("B");
        }).length;
    }, [uniqueDrones]);
}


