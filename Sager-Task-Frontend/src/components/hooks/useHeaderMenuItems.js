import { useMemo } from "react";

/**
 * Static menu items for the header bar.
 */
export default function useHeaderMenuItems() {
    return useMemo(
        () => [
            { key: "capture", icon: "capture-svgrepo-com.svg" },
            { key: "language", icon: "language-svgrepo-com.svg" },
            { key: "bell", icon: "bell.svg" },
        ],
        []
    );
}

 
