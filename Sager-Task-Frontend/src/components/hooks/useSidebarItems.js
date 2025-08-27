import { useMemo } from "react";

export default function useSidebarItems() {
    return useMemo(
        () => [
            { to: "/", icon: "dashboard-svgrepo-com-2.svg", label: "Dashboard" },
            { to: "map", icon: "location-svgrepo-com-2.svg", label: "Map" },
        ],
        []
    );
}


